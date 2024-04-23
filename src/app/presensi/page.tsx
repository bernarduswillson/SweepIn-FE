'use client'

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

// Components
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import ListContainer from '@/components/AttendanceListContainer'

// Interface
import Attendance from '@/interface/AttendanceCard'
import User from '@/interface/User'

const Presensi = (): JSX.Element => {
  const { data: session } = useSession()

  // Query params
  const searchParams = useSearchParams()

  // Date search
  const startDate = searchParams.get('start_date') || ''
  const endDate = searchParams.get('end_date') || ''

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
          setData(response.data.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.id, startDate, endDate])

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">
      {/* Header */}
      <div className="w-11/12 max-w-[641px]">
        <Navbar active="Presensi" />
        <Header title="Presensi" />
      </div>

      {/* Body */}
      <ListContainer data={data as Attendance[]} loading={loading} />
    </div>
  )
}

export default Presensi
