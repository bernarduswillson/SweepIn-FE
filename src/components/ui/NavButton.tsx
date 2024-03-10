"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ToggleButtonProps {
  state: 'Presensi' | 'Laporan'
};

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { state } = props;

  const route = useRouter();

  const [active, setActive] = useState<String>(state);

  const handleToggleClick = (owner: String) => {
    if (active === 'Presensi' && owner != 'Presensi') {
      setActive('Laporan');
      setTimeout(() => {
        route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan`)
      }, 500)
    }
    if (active === 'Laporan' && owner != 'Laporan') {
      setActive('Presensi');
      setTimeout(() => {
        route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi`)
      }, 500)
    }
  }

  return (
    <button className='w-fit relative flex py-2 '>
      <div className='z-[10] flex'>
        <div className={`px-5 poppins-medium transition-all ease-in-out duration-500 ${active === 'Presensi' ? 'text-blue_main' : 'text-white'}`} 
          onClick={() => handleToggleClick('Presensi')}
        >
          Presensi
        </div>
        <div className={`px-5 poppins-medium transition-all ease-in-out duration-500 ${active === 'Laporan' ? 'text-blue_main' : 'text-white'}`} 
          onClick={() => handleToggleClick('Laporan')}
        >
          Laporan
        </div>
      </div>
      <div className={`bg-white absolute h-full w-[50%] rounded-md top-0 transition-all ease-in-out duration-500 ${active === 'Presensi' ? 'left-0' : 'left-1/2'}`} />
    </button>
  );
};

export default ToggleButton;