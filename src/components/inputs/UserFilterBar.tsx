import React, { useState } from 'react'

import Dropdown from '@/components/ui/customDropdown'

interface FilterBarProps {
  location: string
  role: string
  onChange: (name: 'location' | 'role', value: string) => void
}

// Filter bar without search bar
const FilterBar = (props: FilterBarProps): JSX.Element => {

  const { location, role, onChange } = props

  // Location values
  const [locationValue, setLocationValue] = useState<string>(location)

  // Role values
  const [roleValue, setRoleValue] = useState<string>(role)

  // Handle value change
  const handleValueChange = (
    name: 'location' | 'role',
    value: string
  ) => {
    switch (name) {
      case 'location':
        setLocationValue(value)
        onChange('location', value)
        break
      case 'role':
        setRoleValue(value)
        onChange('role', value)
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
        </div>
      </div>
    </div>
  )
}

export default FilterBar
