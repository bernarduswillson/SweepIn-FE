"use client"

import Image from 'next/image';
import { useState } from 'react';

import ToggleButton from '@/components/ui/toggle';
import SearchBar from '@/components/ui/searcbar';
import Card from '@/components/ui/card';
import AlertLog from '@/components/ui/alertLog';

import Calendar from '@/images/Presensi/Calendar.svg'
import Logout from '@/images/Presensi/Logout.svg'

const DataPresensi = [
  {
    date: new Date('2024-03-01'),
    status: 0
  },
  {
    date: new Date('2024-02-29'),
    status: 1
  },
  {
    date: new Date('2024-02-28'),
    status: 2
  },
  {
    date: new Date('2024-02-27'),
    status: 0
  },
  {
    date: new Date('2024-02-26'),
    status: 1
  },
  {
    date: new Date('2024-02-25'),
    status: 2
  },
  {
    date: new Date('2024-02-24'),
    status: 0
  },
  {
    date: new Date('2024-02-23'),
    status: 1
  },
  {
    date: new Date('2024-02-22'),
    status: 2
  },
  {
    date: new Date('2024-02-21'),
    status: 0
  },
  {
    date: new Date('2024-02-20'),
    status: 1
  },
  {
    date: new Date('2024-02-19'),
    status: 2
  },
  {
    date: new Date('2024-02-18'),
    status: 0
  },
  {
    date: new Date('2024-02-17'),
    status: 1
  },
  {
    date: new Date('2024-02-16'),
    status: 2
  },
  {
    date: new Date('2024-02-15'),
    status: 0
  },
  {
    date: new Date('2024-02-14'),
    status: 1
  },
  {
    date: new Date('2024-02-13'),
    status: 2
  },
  {
    date: new Date('2024-02-12'),
    status: 0
  },
  {
    date: new Date('2024-02-11'),
    status: 1
  },
  {
    date: new Date('2024-02-10'),
    status: 2
  },
  {
    date: new Date('2024-02-09'),
    status: 0
  },
  {
    date: new Date('2024-02-08'),
    status: 1
  }
]

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
    <div className="relative h-screen bg-blue_main overflow-hidden">
      <div className='relative h-[30vh]'>
        <div className='flex justify-between pt-5 px-[5vw]'>
          <ToggleButton state={true} />
          <button className='flex items-center transition-all duration-200 ease-in-out hover:translate-x-3' onClick={() => setShowAlert(true)}>
            <Image src={Logout} alt='Logout' />
            <div className='ml-2 font-semibold text-white'>Keluar</div>
          </button>
        </div>
        <div className='justify-end flex flex-col bottom-0 absolute'>
          <div className='mb-10 ml-[5vw]'>
            <h1 className="text-white text-5xl pt-10 font-extrabold">Presensi</h1>
            <h2 className="text-white text-md font-semibold">{getToday()}</h2>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 translate-x-[100px] translate-y-[50px]'>
          <Image src={Calendar} alt='Calendar' />
        </div>
      </div>
      <div className="h-[70vh] px-[5vw] w-full bg-white bottom-0 relative rounded-tl-[40px] flex flex-col">
        <div className='h-fit'>
          <h1 className="text-black text-2xl py-6 font-bold">Riwayat Presensi</h1>
          <SearchBar />
        </div>
        <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
          <div className='w-full h-fit gap-1'>
            {DataPresensi.map((data, index) => (
              <Card key={index} date={data.date} status={data.status} />
            ))}
          </div>
        </div>
      </div>
      {showAlert && <AlertLog onConfirm={handleConfirm} onCancel={handleConfirm} />}
    </div>
  );
};
  
export default Presensi;