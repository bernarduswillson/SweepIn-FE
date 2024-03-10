"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Asset
import RightArrow from '@public/icons/right-arrow-ic';

// Utils
import { date2String } from '@/utils/date';

interface ReportCardProps {
  id: string
  numOfPhoto: number,
  date: Date,
  status: 'belum dikirim' | 'diproses' | 'diterima' | 'ditolak'
}

const Card = (props: ReportCardProps): JSX.Element => {
  const { id, numOfPhoto, date, status } = props;

  const route = useRouter();

  // Is today attendance?
  const [isToday, setIsToday] = useState<Boolean>(date.getDate() === new Date().getDate());

  // Handle card click
  const handleClick = () => {
    if (status === 'belum dikirim') {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan/baru`);
    } else {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan/${id}`);
    }
  }

  return (
    <div className="w-full">
      <div className={`w-full relative rounded-xl flex justify-between items-center cursor-pointer ${isToday ? 'bg-blue_main' : 'bg-grey_bg'} p-3 mb-3 group`} onClick={handleClick}>
        <div className='w-full flex flex-col'>

          {/* Label */}
          <div className={`poppins-bold text-sm  ${isToday ? ' text-white' : 'text-blue_main'}`}>
            {numOfPhoto ? `${numOfPhoto} Foto` : 'Belum ada foto'}
          </div>

          {/* Date */}
          <div className={`poppins-bold text-2xl  ${isToday ? ' text-white' : 'text-black'}`}>
            {
              isToday ?
              'Hari ini' :
              date2String(date)
            }
          </div>

          {/* Status */}
          <div className='w-fit h-fit flex items-center gap-1.5'>
            <div className={`w-[10px] h-[10px] rounded-full ${status === 'belum dikirim' ? 'bg-red-500' : status === 'diproses' ? 'bg-orange_main' : status === 'diterima' ? 'bg-green_main' : 'bg-red_main'}`}></div>
            <span className={`poppins-medium text-base ${isToday ? 'text-white' : 'text-black'}`}>Laporan {status}</span>
          </div>

        </div>

        <div className='transition-transform ease-in-out duration-150 mr-3 group-hover:translate-x-2'>
          <RightArrow fillColor={isToday ? '#FCFCFC' : '#1C1C1C'} />
        </div>

      </div>
    </div>
  )
}

export default Card