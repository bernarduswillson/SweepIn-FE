'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Icons
import RightArrowIcon from '../icons/RightArrowIcon'

// Utils
import { date2String } from '@/utils/date'
import { parseStatus } from '@/utils/status'

interface ReportCardProps {
  id: string
  numOfPhoto: number
  date: Date
  status: string
}

const Card = (props: ReportCardProps): JSX.Element => {
  const { id, numOfPhoto, date, status } = props

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
        className={`relative w-full p-3 mb-3 rounded-xl ${isToday ? 'bg-primary-500' : 'bg-surface-container'} flex justify-between items-center cursor-pointer group`}
        onClick={handleClick}
      >
        <div className="w-full flex flex-col">
          {/* Label */}
          <div
            className={`bold-sm ${isToday ? ' text-neutral-100' : 'text-primary-500'}`}
          >
            {numOfPhoto === 0 ? 'Tidak ada foto' : numOfPhoto > 0 ? `${numOfPhoto} foto` : ''}
          </div>

          {/* Date */}
          <div
            className={`header-3 ${isToday ? ' text-neutral-100' : 'text-neutral-900'}`}
          >
            {isToday ? 'Hari ini' : date2String(date)}
          </div>

          {/* Status */}
          <div className="w-fit h-fit flex items-center gap-1.5">
            <div
              className={`w-[10px] h-[10px] rounded-full ${status === 'WAITING' ? 'bg-warning-500' : status === 'ACCEPTED' ? 'bg-success-500' : 'bg-error-500'}`}
            ></div>
            <span
              className={`body-m ${isToday ? 'text-neutral-100' : 'text-neutral-900'}`}
            >
              Laporan {parseStatus(status)}
            </span>
          </div>
        </div>

        <div className="transition-fast mr-1 group-hover:translate-x-2">
          <RightArrowIcon className={`${isToday ? 'text-neutral-100' : 'text-neutral-900'}`} height="1.5rem" />
        </div>
      </div>
    </div>
  )
}

export default Card
