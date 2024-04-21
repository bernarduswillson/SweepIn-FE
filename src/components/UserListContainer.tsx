import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { easeInOut, motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'

// Interfaces
import MonthRange from '@/interface/MonthRange'
import User from '@/interface/User'

// Components
import UserSearchBar from '@/components/ui/UserSearchBar'
import UserCard from '@/components/ui/UserCard'
import SweepLoader from '@/components/ui/SweepLoader'
import Pagination from '@/components/ui/customPagination'
import { set } from 'date-fns'

interface ListContainerProps {
  data: User[]
  count: number[]
  loading: boolean
}

const ListContainer = (props: ListContainerProps): JSX.Element => {
  const { data, count, loading } = props

  // Params
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  // Name values
  const [nameValue, setNameValue] = useState<string>('')

  // Location values
  const [locationValue, setLocationValue] = useState<string>('')

  // Role values
  const [roleValue, setRoleValue] = useState<string>('')

  // Page values
  const [pageValue, setPageValue] = useState<number>(page)

  const [valueChanged, setValueChanged] = useState<boolean>(false)

  // Handle value change
  const handleValueChange = (
    name: 'name' | 'location' | 'role',
    value: string
  ) => {
    switch (name) {
      case 'name':
        setNameValue(value)
        break
      case 'location':
        setLocationValue(value)
        break
      case 'role':
        setRoleValue(value)
        break
    }
    setValueChanged(true)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setPageValue(page)
  }

  // Debounce search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const queryParams = new URLSearchParams()

      if (valueChanged) {
        setPageValue(1)
      }

      if (pageValue) queryParams.append('page', pageValue.toString())
      if (nameValue) queryParams.append('name', nameValue)
      if (locationValue) queryParams.append('location', locationValue)
      if (roleValue) queryParams.append('role', roleValue)

      const queryString = queryParams.toString()
      const newPath = `${window.location.pathname}?${queryString}`
      router.push(newPath)
      setValueChanged(false)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [pageValue, nameValue, locationValue, roleValue])

  return (
    <div className="w-full flex justify-center flex-grow bg-white rounded-t-[26px]">
      <div className="w-11/12 flex flex-col gap-6 pt-6">
        <UserSearchBar
          name={nameValue}
          location={locationValue}
          role={roleValue}
          onChange={handleValueChange}
        />

        <div className="w-full h-fit flex flex-col items-center gap-1">
          {!loading ? (
            data &&
            data.map((item: User, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: easeInOut
                  }
                }}
                viewport={{ once: true }}
                className="w-full"
              >
                <UserCard
                  id={item.id as string}
                  name={item.name}
                  email={item.email}
                  role={item.role}
                  location={item.location}
                />
              </motion.div>
            ))
          ) : (
            <SweepLoader />
          )}
        </div>
        <Pagination
          page={page}
          totalItem={count[0]}
          perPage={count[1]}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default ListContainer
