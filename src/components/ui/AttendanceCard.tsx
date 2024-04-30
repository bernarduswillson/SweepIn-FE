'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Icons
import RightArrowIcon from '../icons/RightArrowIcon'

// Utils
import { date2String } from '@/utils/date'
import CheckMarkIcon from '../icons/CheckMarkIcon'
import CrossMarkIcon from '../icons/CrossMarkIcon'

interface AttendanceCardProps {
  id: String
  date: Date
  startAttendanceId: String | null
  endAttendanceId: String | null
}

const Card = (props: AttendanceCardProps): JSX.Element => {
  const { id, date, startAttendanceId, endAttendanceId } = props

  const route = useRouter()
  const url = usePathname()
  const page = url.split('/')[1]

  // Is today attendance?
  const [isToday, setIsToday] = useState<Boolean>(() => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  })

  // Handle card click
  const handleClick = () => {
    if (page === 'admin') {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/presensi/${id}`)
      // Routing to start log form
    } else if (isToday && !startAttendanceId && !endAttendanceId) {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/baru`)
      // Routing to end log form
    } else if (isToday && !endAttendanceId) {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/baru/${id}`)
      // Routing to attendance detail page
    } else {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/${id}`)
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
            Presensi
          </div>

          {/* Date */}
          <div
            className={`header-3  ${isToday ? ' text-neutral-100' : 'text-neutral-900'}`}
          >
            {isToday ? 'Hari ini' : date2String(date)}
          </div>

          {/* Status */}
          <div className="w-full h-fit flex gap-3">
            {/* Start attendance status */}
            <div className="w-fit h-fit flex items-center gap-1.5">
              {startAttendanceId ? (
                <CheckMarkIcon className="text-success-500" width="1rem"/>
              ) : (
                <CrossMarkIcon className="text-error-500" width="1rem" />
              )}
              <span
                className={`body-m ${isToday ? 'text-neutral-100' : 'text-neutral-900'}`}
              >
                Presensi Awal
              </span>
            </div>

            {/* End attendance status */}
            <div className="w-fit h-fit flex items-center gap-1.5">
              {endAttendanceId ? (
                <CheckMarkIcon className="text-success-500" width="1rem"/>
              ) : (
                <CrossMarkIcon className="text-error-500" width="1rem" />
              )}
              <span
                className={`body-m ${isToday ? 'text-neutral-100' : 'text-neutral-900'}`}
              >
                Presensi Akhir
              </span>
            </div>
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
