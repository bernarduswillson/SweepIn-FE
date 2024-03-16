import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// Components
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/customDropdown';

interface SearchBarProps {
  name: string;
  location: string;
  role: string;
  onChange: (name: 'name' | 'location' | 'role', value: string) => void,
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { name, location, role, onChange } = props;

  // Name values
  const [nameValue, setNameValue] = useState<string>(name);
  
  // Location values
  const [locationValue, setLocationValue] = useState<string>(location);

  // Role values
  const [roleValue, setRoleValue] = useState<string>(role);

  // Handle value change
  const handleValueChange = (name: 'name' | 'location' | 'role', value: string) => {
    switch (name) {
      case 'name':
        setNameValue(value);
        onChange('name', value);
        break;
      case 'location':
        setLocationValue(value);
        onChange('location', value);
        break;
      case 'role':
        setRoleValue(value);
        onChange('role', value);
        break;
    }
  }

  return (
    <div className='w-full gap-2'>

      {/* Name search field */}
      <input 
        className={`w-full flex justify-between items-center py-1 px-2 pl-3 border-grey border-2 rounded-xl poppins-medium `} 
        type="text"
        placeholder="Cari berdasarkan nama"
        onChange={(e) => handleValueChange('name', e.target.value)}
      />

      <div className='flex mt-2 gap-3'>

        {/* Location dropdown */}
        <Dropdown 
          label="Lokasi"
          placeholder='Pilih Lokasi'
          onChange={(value) => handleValueChange('location', value)}
          options={[
            'Semua Lokasi',
            'GANESHA',
            'JATINANGOR',
            'CIREBON',
          ]}
        />

        {/* Role dropdown */}
        <Dropdown 
          label="Role"
          placeholder='Pilih Role'
          onChange={(value) => handleValueChange('role', value)}
          options={[
            'Semua Role',
            'ADMIN',
            'CLEANER',
            'SECURITY',
          ]}
        />
      </div>
      

    </div>
  )
}

export default SearchBar