'use client'

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

// Components
import Header from '@/components/AdminHeader'
import AttendaceListContainer from '@/components/AdminAttendanceListContainer'
import ReportListContainer from '@/components/AdminReportListContainer'
import Sidebar from '@/components/Sidebar'
import UserEditForm from '@/components/UserEditForm'
import ToggleButton from '@/components/AdminToggleButton'

// Interface
import User from '@/interface/User'
import Attendance from '@/interface/AdminAttendanceCard'
import Report from '@/interface/AdminReportCard'
import { set } from 'date-fns'

const DetailUser = (): JSX.Element => {
  const { data: session } = useSession()
  const router = useRouter()

  // Get attendance id
  const { id } = useParams()

   // Query params
   const searchParams = useSearchParams()

   // Pagination
   const [countAttendance, setCountAttendance] = useState<number[]>([])
    const [countReport, setCountReport] = useState<number[]>([])
   const itemsPerPage = 10
   const page = Number(searchParams.get('page')) || 1
 
   // Name search
   const name = searchParams.get('name') || ''
 
   // Location search
   const location = searchParams.get('location') || ''
 
   // Role search
   const role = searchParams.get('role') || ''
 
   // User data
   const [user, setUser] = useState<User | null>(null)
 
   // Fetch data
   const [data, setData] = useState<User[]>([])
   const [loading, setLoading] = useState<boolean>(true)

  // Date search
  const startDate = searchParams.get('start_date') || ''
  const endDate = searchParams.get('end_date') || ''

  // Container state
  const [container, setContainer] = useState<'Presensi' | 'Laporan'>('Presensi')

  // Fetch data
  const [userData, setUserData] = useState<User>({
    id: '',
    name: '',
    email: '',
    location: '',
    role: ''
  })
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])
  const [reportData, setReportData] = useState<Report[]>([])

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session])

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
          )
          setUserData(response.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [id])

  // Fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (id) {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_API_URL +
              `/attendance?user_id=${id}&page=${page}&per_page=${itemsPerPage}&start_date=${startDate}&end_date=${endDate}`
          )
          setAttendanceData(response.data.data)
          setCountAttendance([response.data.filteredcount, itemsPerPage, response.data.countAllAttendance])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, startDate, endDate, page])

  // Fetch report data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (id) {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_API_URL +
              `/report?user_id=${id}&page=${page}&per_page=${itemsPerPage}&start_date=${startDate}&end_date=${endDate}`
          )
          setReportData(response.data.data)
          setCountReport([response.data.filteredcount, itemsPerPage, response.data.countAllReport])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, startDate, endDate, page])

  return (
    <div className="flex flex-row-reverse w-screen h-screen">
      <div className="w-full flex flex-col items-center bg-white">
        {/* Header */}
        <div className="w-11/12">
          <Header title="Detail User" />
        </div>

        {/* Body */}
        <div className="w-11/12">
          <h2 className="poppins-extrabold text-lg mb-5">Profil</h2>
          <UserEditForm data={userData as User} />

          <h2 className="poppins-extrabold text-lg mb-5 mt-10">Aktivitas</h2>
          <ToggleButton active={container} setActive={setContainer} />
          {container === 'Presensi' ? (
            <AttendaceListContainer
              data={attendanceData as Attendance[]}
              count = {countAttendance}
              loading={loading}
              active={container}
            />
          ) : (
            <ReportListContainer
              data={reportData as Report[]}
              count = {countReport}
              loading={loading}
              active={container}
            />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar active="user" />
    </div>
  )
}

export default DetailUser
