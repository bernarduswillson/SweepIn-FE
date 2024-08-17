'use client';

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

// Components
import BottomNavbar from '@/components/navigation/BottomNavbar';
import Header from '@/components/sections/Header'
import AttendanceListContainer from '@/components/sections/AttendanceListContainer'

// Interface
import Attendance from '@/interface/AttendanceCard'
import User from '@/interface/User'
import HomeHeader from '@/components/navigation/HomeHeader';

const Presensi = (): JSX.Element => {
  const { data: session } = useSession()

  // Query params
  const searchParams = useSearchParams()

  // Date search
  const startDate = searchParams.get('start_date') || ''
  const endDate = searchParams.get('end_date') || ''

  // Attendace status
  const [attendanceStatus, setAttendanceStatus] = useState<number>(0)

  // User data
  const [user, setUser] = useState<User | null>(null)

  // Fetch data
  const [data, setData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (user?.id) {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_API_URL +
              `/attendance?user_id=${user?.id}&page=1&per_page=10&start_date=${startDate}&end_date=${endDate}`
          )
          setData(response.data.data.attendance)
        }
      } catch (error) {
        setData([])
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.id, startDate, endDate])

  // Check attendance status
  useEffect(() => {

    if (data) {
      data.forEach((attendance) => {
        if (attendance.endLog[0] && attendance.date.split('T')[0] === new Date().toISOString().split('T')[0]) {
          setAttendanceStatus(2)
        } else if (attendance.date.split('T')[0] === new Date().toISOString().split('T')[0]) {
          setAttendanceStatus(1)
        }
      })
    }
  }, [data])

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-primary-500">
      {/* Mobile container */}
      <div className="w-11/12 max-w-[640px]">
        <HomeHeader currentPage='Presensi' />

        <Header type="attendance" />
      </div>

      {/* Body */}
      <AttendanceListContainer data={data as Attendance[]} loading={loading} />

      {/* Navbar */}
      <BottomNavbar active="presensi" attendaceStatus={attendanceStatus} />
    </div>
  )
}

export default Presensi
