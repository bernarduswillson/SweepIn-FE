"use client"

import React, { useState } from 'react'

import RightArrow from '@/images/Presensi/RightArrow';

interface CardProps {
  date: Date,
  photo: number,
  status: number
}

const Card = ({ date, photo, status }: CardProps): JSX.Element => {
  const convertDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${date.getDate()} ${month} ${year}`;
  }

  const convertPhoto = (photo: number) => {
    if (photo === 0) {
      return 'Belum ada foto'
    } else {
        return `${photo} Foto`
    }
  }

  return (
    <div className={`w-full relative rounded-xl flex justify-between items-center ${date.getDate() === new Date().getDate() ? 'bg-blue_main text-white' : 'bg-grey_bg'} p-3 mb-3`}>
      <div>
        <div className={`font-extrabold text-sm  ${date.getDate() !== new Date().getDate() ? ' text-blue_main' : ''}`}>
          {convertPhoto(photo)}
        </div>
        <div className={`font-bold text-xl  ${date.getDate() !== new Date().getDate() ? ' text-black' : ''}`}>
          {date.getDate() == new Date().getDate() ? 'Laporan Hari ini' : convertDate(date)}
        </div>
        <div className={`flex items-center text-sm font-semibold  ${date.getDate() !== new Date().getDate() ? ' text-grey_text' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${status === 0 ? 'bg-orange' : status === 1 ? 'bg-orange' : status=== 2 ? 'bg-green_main' : 'bg-red'} mr-2`}></div>
          {status === 0 ? 'Laporan belum dikirim' : status === 1 ? 'Laporan diproses' : status=== 2 ? 'Laporan diterima' : 'Laporan ditolak'}
        </div>
      </div>
      <div className='mr-3'>
        <RightArrow fillColor={date.getDate() === new Date().getDate() ? '#FCFCFC' : '#000000'} />
      </div>
    </div>
  )
}

export default Card