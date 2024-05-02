import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Components
import Button from '@/components/ui/button'
import Dropdown from '@/components/ui/customDropdown'
import search_ic from '@/../public/icons/search-ic.svg'

interface SearchBarProps {
  name: string
  location: string
  role: string
  status: string
  onChange: (name: 'name' | 'location' | 'role' | 'status', value: string) => void
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { name, location, role, status, onChange } = props

  // Name values
  const [nameValue, setNameValue] = useState<string>(name)

  // Location values
  const [locationValue, setLocationValue] = useState<string>(location)

  // Role values
  const [roleValue, setRoleValue] = useState<string>(role)

  // Status values
  const [statusValue, setStatusValue] = useState<string>(status)

  // Handle value change
  const handleValueChange = (
    name: 'name' | 'location' | 'role' | 'status',
    value: string
  ) => {
    switch (name) {
      case 'name':
        setNameValue(value)
        onChange('name', value)
        break
      case 'location':
        setLocationValue(value)
        onChange('location', value)
        break
      case 'role':
        setRoleValue(value)
        onChange('role', value)
        break
      case 'status':
        setStatusValue(value)
        onChange('status', value)
        break
    }
  }

  return (
    <div className="w-full gap-2">
      <div className="flex justify-between mb-4">
        <div className="w-full flex">
          <div className='w-1/3 flex gap-5'>
            {/* Location dropdown */}
            <div className='w-full'>
              <h3 className='poppins-bold'>Lokasi</h3>
              <Dropdown
                label="Lokasi"
                placeholder="Semua Lokasi"
                onChange={(value) => handleValueChange('location', value)}
                options={[
                  'Semua Lokasi',
                  'GANESHA',
                  'JATINANGOR',
                  'CIREBON',
                  'BOSSCHA'
                ]}
              />
            </div>

            {/* Role dropdown */}
            <div className='w-full'>
              <h3 className='poppins-bold'>Role</h3>
              <Dropdown
                label="Role"
                placeholder="Semua Role"
                onChange={(value) => handleValueChange('role', value)}
                options={['Semua Role', 'ADMIN', 'CLEANER', 'SECURITY']}
              />
            </div>
          </div>

          {/* Name search field */}
          <div className='h-full w-2/3 ml-5 flex flex-col'>
            <h3 className='poppins-bold'>Cari</h3>
            <div className='w-full relative h-full'>
              <input
                className={`w-full h-full flex justify-between items-center py-1 px-2 pl-3 border-outline border-[1px] rounded-xl poppins-medium `}
                type="text"
                placeholder="Cari berdasarkan nama"
                onChange={(e) => handleValueChange('name', e.target.value)}
              />
              <div className='absolute right-5 top-0 bottom-0 flex items-center'>
                <Image src={search_ic} alt="search" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Status dropdown */}
      <div className='w-[150px]'>
        <h3 className='poppins-bold'>Status</h3>
        <Dropdown
          label="Status"
          placeholder="ACTIVE"
          onChange={(value) => handleValueChange('status', value)}
          options={[
            'ACTIVE',
            'INACTIVE'
          ]}
        />
      </div>
    </div>
  )
}

export default SearchBar
