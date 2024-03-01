"use client"

import React, { useState } from 'react'
import Image from 'next/image';

import Icon from '@/images/Presensi/CalendarIcon.svg'
import { Calendar } from "@/components/ui/calendar"

const SearchBar = (): JSX.Element => {
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);
  const [showCalendarTo, setShowCalendarTo] = useState(false);
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(new Date());
  const [dateTo, setDateTo] = React.useState<Date | undefined>(new Date());

  const handleOkeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDateFrom(dateFrom);
    setDateTo(dateTo);
    setShowCalendarFrom(false);
    setShowCalendarTo(false);
  }

  const convertDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  return (
    <div className='w-full flex'>
      <button className='flex justify-between w-[40%] border-2 rounded-xl text-text_grey py-1 px-2 mr-2' onClick={() => setShowCalendarFrom(true)}>
        {dateFrom ? convertDate(dateFrom) : 'dari'}
        <Image src={Icon} alt='Calendar' width={25} />
        {showCalendarFrom && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
              <div className='text-black pt-3 font-bold'>Pilih tanggal dari</div>
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                className=""
              />
              <button className='bg-blue_main text-white px-4 py-1 rounded-xl mb-3 font-bold hover:opacity-80' onClick={(e) => handleOkeButtonClick(e)}>
                Okay
              </button>
            </div>
          </>
        )}
      </button>
      <button className='flex justify-between w-[40%] border-2 rounded-xl text-text_grey py-1 px-2 mr-2' onClick={() => setShowCalendarTo(true)}>
        {dateTo ? convertDate(dateTo) : 'sampai'}
        <Image src={Icon} alt='Calendar' width={25} />
        {showCalendarTo && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
            <div className='text-black pt-3 font-bold'>Pilih tanggal sampai</div>
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                className=""
              />
              <button className='bg-blue_main text-white px-4 py-1 rounded-xl mb-3 font-bold hover:opacity-80' onClick={(e) => handleOkeButtonClick(e)}>
                Okay
              </button>
            </div>
          </>
        )}
      </button>
      <button className='w-[20%] bg-green_main text-white rounded-xl hover:opacity-80 font-bold'>Cari</button>
    </div>
  )
}

export default SearchBar