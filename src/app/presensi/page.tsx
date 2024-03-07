"use client"

import { useState } from 'react';
import Image from 'next/image';

import Navbar from '@components/Navbar'


import SearchBar from '@/components/ui/searcbar';
import Card from '@/components/ui/card';
import AlertLog from '@/components/ui/alertLog';

import Calendar from '@/images/Presensi/Calendar.svg'

// Data
import AttendanceData from "@data/attendanceDummy.json"

const Presensi = (): JSX.Element => {
  const getToday = () => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();
    
    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }

  const [showAlert, setShowAlert] = useState(false);
  const handleJoinClick = (): void => {
    setShowAlert(true)
  }
  const handleConfirm = (): void => {
    setShowAlert(false)
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-blue_main overflow-hidden">

        {/* Header */}
        <div className='relative w-11/12 max-w-[641px] h-[40vh]'>
          <Navbar />
          
          <div className='justify-end flex flex-col bottom-0 absolute'>
            <div className='mb-7'>
              <h1 className="text-white text-5xl pt-10 font-extrabold">Presensi</h1>
              <h2 className="text-white text-md font-semibold">{getToday()}</h2>
            </div>
          </div>

          <div className='absolute bottom-0 right-0 translate-x-[100px] translate-y-[50px]'>
            <Image src={Calendar} alt='Calendar' />
          </div>
        </div>

        {/* Body */}
        <div className="w-full max-w-[641px] h-[70vh] bg-white rounded-t-[26px] flex flex-col">
          <div className='h-fit'>
            <h1 className="text-black text-2xl py-6 font-bold">Riwayat Presensi</h1>
            <SearchBar />
          </div>
          <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
            <div className='w-full h-fit gap-1'>
              {/* {DataPresensi.map((data, index) => (
                <Card key={index} date={data.date} status={data.status} />
              ))}  */}
            </div>
          </div>
        </div>

      {/* {showAlert && <AlertLog onConfirm={handleConfirm} onCancel={handleConfirm} />} */}
    
    </div>
  );
};
  
export default Presensi;