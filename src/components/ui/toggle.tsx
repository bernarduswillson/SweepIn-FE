"use client"

import React, { useState } from 'react'

interface ToggleButtonProps {
  state: boolean
}

const ToggleButton = ({ state }: ToggleButtonProps): JSX.Element => {
  const [value, setValue] = useState(state);

  const hadleToggleFalse = () => {
    setValue(false);
  }

  const hadleToggleTrue = () => {
    setValue(true);
  }

  return (
    <button className='w-fit relative flex py-1 text-black'>
      <div className='z-[10] flex font-semibold'>
        <div className={`px-5 transition-all ease-in-out duration-500 ${value ? 'text-blue_main' : 'text-white'}`} onClick={hadleToggleTrue}>Presensi</div>
        <div className={`px-5 transition-all ease-in-out duration-500 ${value ? 'text-white' : 'text-blue_main'}`} onClick={hadleToggleFalse}>Laporan</div>
      </div>
      <div className={`bg-white absolute h-full w-[50%] rounded-md top-0 transition-all ease-in-out duration-500`} style={{ left: value ? '0' : '50%' }}></div>
    </button>
  )
}

export default ToggleButton