'use client'

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Components
import Header from '@/components/AdminHeader'
import ListContainer from '@/components/AdminUserListContainer'
import Sidebar from '@/components/Sidebar'

// Interface
import type User from '@/interface/User'

const User = (): JSX.Element => {
  const { data: session } = useSession()

  // Query params
  const searchParams = useSearchParams()

  // Pagination
  const [count, setCount] = useState<number[]>([])
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
            `${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}&per_page=${itemsPerPage}&name=${name}${location && location != 'Semua Lokasi' ? `&location=${location}` : ''}${role && role != 'Semua Role' ? `&role=${role}` : ''}`
          )
          setData(response.data.data.users)
          setCount([response.data.data.FilteredUsersCount, itemsPerPage, response.data.data.AllUsersCount])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [location, name, page, role, user?.id])

  return (
    <div className="flex flex-row-reverse w-screen h-screen">
      <div className="w-full flex flex-col items-center bg-white">
        {/* Header */}
        <div className="w-11/12">
          <div className='flex justify-between items-center'>
            <Header title="Daftar User"/>
            {/* Add user button */}
            <Link
              className="flex items-center justify-center bg-green_main text-white rounded-lg w-[150px] py-2 poppins-medium"
              href="user/baru"
            >
              + Tambah User
            </Link>
          </div>

          {/* Body */}
          <ListContainer data={data as User[]} count={count} loading={loading} />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar active='user'/>
    </div>
  )
}

export default User
