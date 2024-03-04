"use client"

import Image from 'next/image';
import { useState } from 'react';

import ToggleButton from '@/components/ui/toggle';
import SearchBar from '@/components/ui/searcbar';
import Card from '@/components/ui/cardLaporan';
import AlertLog from '@/components/ui/alertLog';

import Tabler from '@/images/Laporan/tabler_report.svg'
import Logout from '@/images/Laporan/Logout.svg'

const DataLaporan = [
  {
    date: new Date('2024-03-04'),
    photo: 0,
    status: 0
  },
  {
    date: new Date('2024-02-29'),
    photo: 3,
    status: 1
  },
  {
    date: new Date('2024-02-28'),
    photo: 4,
    status: 2
  },
  {
    date: new Date('2024-02-27'),
    photo: 2,
    status: 3
  },
  {
    date: new Date('2024-02-26'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-25'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-24'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-23'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-22'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-21'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-20'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-19'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-18'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-17'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-16'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-15'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-14'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-13'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-12'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-11'),
    photo: 2,
    status: 1
  },
  {
    date: new Date('2024-02-10'),
    photo: 2,
    status: 2
  },
  {
    date: new Date('2024-02-09'),
    photo: 2,
    status: 0
  },
  {
    date: new Date('2024-02-08'),
    photo: 2,
    status: 1
  }
]

const Laporan = (): JSX.Element => {
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
            <h1 className="text-white text-5xl pt-10 font-extrabold">Laporan</h1>
            <h2 className="text-white text-md font-semibold">{getToday()}</h2>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 translate-x-[10px] translate-y-[90px]'>
          <Image src={Tabler} alt='Calendar' />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="h-[70vh] px-[5vw] sm:w-[85vw] w-full bg-white bottom-0 relative rounded-t-[40px] flex flex-col">
          <div className='h-fit'>
            <h1 className="text-black text-2xl py-6 font-bold">Daftar Laporan</h1>
            <SearchBar />
          </div>
          <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
            <div className='w-full h-fit gap-1'>
              {DataLaporan.map((data, index) => (
                <Card key={index} date={data.date} photo={data.photo} status={data.status} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAlert && <AlertLog onConfirm={handleConfirm} onCancel={handleConfirm} />}
    </div>
  );
};
  
export default Laporan;