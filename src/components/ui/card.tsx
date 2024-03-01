"use client"

import React, { useState } from 'react'

import Alert from '@/components/ui/alertLoc';

import RightArrow from '@/images/Presensi/RightArrow';

interface CardProps {
  date: Date,
  status: number
}

const Card = ({ date, status }: CardProps): JSX.Element => {
  const convertDate = (date: Date) => {
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
    <div className={`w-full relative rounded-xl flex justify-between items-center ${date.getDate() === new Date().getDate() ? 'bg-blue_main text-white' : 'bg-grey_bg'} p-3 mb-3`} onClick={() => setShowAlert(true)}>
      <div>
        <div className={`font-extrabold text-sm  ${date.getDate() !== new Date().getDate() ? ' text-blue_main' : ''}`}>
          Presensi
        </div>
        <div className={`font-bold text-xl  ${date.getDate() !== new Date().getDate() ? ' text-black' : ''}`}>
          {convertDate(date)}
        </div>
        <div className={`flex items-center text-sm font-semibold  ${date.getDate() !== new Date().getDate() ? ' text-grey_text' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${status === 0 ? 'bg-red' : status === 1 ? 'bg-orange' : 'bg-green_main'} mr-2`}></div>
          {status === 0 ? 'Belum Presensi awal dan akhir' : status === 1 ? 'Belum Presensi Akhir' : 'Sudah Presensi'}
        </div>
      </div>
      <div className='mr-3'>
        <RightArrow fillColor={date.getDate() === new Date().getDate() ? '#FCFCFC' : '#000000'} />
      </div>
      {showAlert && <Alert onConfirm={handleConfirm} />}
    </div>
  )
}

export default Card