"use client"

import React, { useState } from 'react'

interface ToggleButtonProps {
  state: 'Presensi' | 'Laporan'
};

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { state } = props;

  const [value, setValue] = useState<String>(state);

  const handleToggleClick = () => {
    if (value === 'Presensi') {
      setValue('Laporan');
    } else {
      setValue('Presensi');
    }
  }

  return (
    <button className='w-fit relative flex py-2 '>
      <div className='z-[10] flex'>
        <div className={`px-5 poppins-medium transition-all ease-in-out duration-500 ${value === 'Presensi' ? 'text-blue_main' : 'text-white'}`} onClick={handleToggleClick}>Presensi</div>
        <div className={`px-5 poppins-medium transition-all ease-in-out duration-500 ${value === 'Laporan' ? 'text-blue_main' : 'text-white'}`} onClick={handleToggleClick}>Laporan</div>
      </div>
      <div className={`bg-white absolute h-full w-[50%] rounded-md top-0 transition-all ease-in-out duration-500 ${value === 'Presensi' ? 'left-0' : 'left-1/2'}`} />
    </button>
  );
};

export default ToggleButton;