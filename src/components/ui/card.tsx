"use client"

import React, { useState } from 'react';
import Image from 'next/image';

// Components
import Alert from '@/components/ui/alertLoc';

// Asset
import RightArrow from '@public/icons/RightArrow';
import UncheckedMark from '@public/icons/status-unchecked.svg';
import CheckedMark from '@public/icons/status-checked.svg';

interface CardProps {
  date: Date,
  startAttendanceId: String | null,
  endAttendanceId: String | null 
}

const Card = (props: CardProps): JSX.Element => {
  const { date, startAttendanceId, endAttendanceId } = props;

  // Is today attendance?
  const [isToday, setIsToday] = useState<Boolean>(date.getDate() === new Date().getDate());

  // Parse date to String (DAY, DD MONTH YYYY)
  const parseDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${date.getDate()} ${month} ${year}`;
  }

  const [showAlert, setShowAlert] = useState(false);
  const handleConfirm = (): void => {
    setShowAlert(false)
  }

  return (
    <div className={`w-full relative rounded-xl flex justify-between items-center cursor-pointer ${isToday ? 'bg-blue_main' : 'bg-grey_bg'} p-3 mb-3 group`} onClick={() => setShowAlert(true)}>
      <div className='w-full flex flex-col'>

        {/* Label */}
        <div className={`poppins-bold text-sm  ${isToday ? ' text-white' : 'text-blue_main'}`}>
          Presensi
        </div>

        {/* Date */}
        <div className={`poppins-bold text-2xl  ${isToday ? ' text-white' : 'text-black'}`}>
          {
            isToday ?
            'Hari ini' :
            parseDate(date)
          }
        </div>

        {/* Status */}
        <div className='w-full h-fit flex gap-3'>

          {/* Start attendance status */}
          <div className='w-fit h-fit flex items-center gap-1.5'>
            {
              startAttendanceId ?
              <Image src={CheckedMark} alt='Centang'/> :
              <Image src={UncheckedMark} alt='Silang'/>
            }
            <span className={`poppins-medium text-base ${isToday ? 'text-white' : 'text-black'}`}>Presensi Awal</span>
          </div>

          {/* End attendance status */}
          <div className='w-fit h-fit flex items-center gap-1.5'>
            {
              endAttendanceId ?
              <Image src={CheckedMark} alt='Centang'/> :
              <Image src={UncheckedMark} alt='Silang'/> 
            }
            <span className={`poppins-medium text-base ${isToday ? 'text-white' : 'text-black'}`}>Presensi Akhir</span>
          </div>
          
        </div>

      </div>

      <div className='transition-transform ease-in-out duration-150 mr-3 group-hover:translate-x-2'>
        <RightArrow fillColor={isToday ? '#FCFCFC' : '#1C1C1C'} />
      </div>

      {showAlert && <Alert onConfirm={handleConfirm} />}

    </div>
  )
}

export default Card