'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Asset
import RightArrow from '@public/icons/right-arrow-ic'

// Utils
import { date2String } from '@/utils/date'
import { parseStatus } from '@/utils/status'

interface ReportCardProps {
  id: string
  username: string
  numOfPhoto: number
  date: Date
  status: string
}

const Card = (props: ReportCardProps): JSX.Element => {
  const { id, username, numOfPhoto, date, status } = props

  const route = useRouter()
  const url = usePathname()
  const page = url.split('/')[1]

  // Is today attendance?
  const [isToday, setIsToday] = useState<Boolean>(
    date.getDate() === new Date().getDate()
  )

  // Handle card click
  const handleClick = () => {
    if (page === 'admin') {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/laporan/${id}`)
    } else if (status === 'belum dikirim') {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan/baru`)
    } else {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan/${id}`)
    }
  }

  return (
    <div className="w-full">
      <div
        className={`w-full relative rounded-xl flex justify-between items-center cursor-pointer bg-grey_bg p-3 group`}
        onClick={handleClick}
      >
        <div className="w-full flex items-center poppins-bold text-xl text-black">
          {/* Name */}
          <div className="w-1/4">{username}</div>

          {/* Date */}
          <div className="w-1/4">{date2String(date)}</div>

          {/* Number of photo */}
          <div className="w-1/4">{numOfPhoto}</div>

          {/* Status */}
          <div className="w-fit h-fit flex items-center gap-1.5">
            <div
              className={`w-[10px] h-[10px] rounded-full ${status === 'WAITING' ? 'bg-orange_main' : status === 'ACCEPTED' ? 'bg-green_main' : 'bg-red_main'}`}
            ></div>
            <span
              className={`${isToday ? 'text-white' : 'text-black'}`}
            >
              Laporan {parseStatus(status)}
            </span>
          </div>
        </div>

        <div className="absolute transition-transform ease-in-out duration-150 right-5 group-hover:translate-x-2">
          <RightArrow fillColor="#1C1C1C" />
        </div>
      </div>
    </div>
  )
}

export default Card
