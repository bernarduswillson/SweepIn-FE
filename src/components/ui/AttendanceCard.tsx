'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

// Asset
import RightArrow from '@public/icons/right-arrow-ic'
import UncheckedMark from '@public/icons/status-unchecked-ic.svg'
import CheckedMark from '@public/icons/status-checked-ic.svg'

// Utils
import { date2String } from '@/utils/date'

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
        className={`w-full relative rounded-xl flex justify-between items-center cursor-pointer ${isToday ? 'bg-blue_main' : 'bg-grey_bg'} p-3 mb-3 group`}
        onClick={handleClick}
      >
        <div className="w-full flex flex-col">
          {/* Label */}
          <div
            className={`poppins-bold text-sm  ${isToday ? ' text-white' : 'text-blue_main'}`}
          >
            Presensi
          </div>

          {/* Date */}
          <div
            className={`poppins-bold text-2xl  ${isToday ? ' text-white' : 'text-black'}`}
          >
            {isToday ? 'Hari ini' : date2String(date)}
          </div>

          {/* Status */}
          <div className="w-full h-fit flex gap-3">
            {/* Start attendance status */}
            <div className="w-fit h-fit flex items-center gap-1.5">
              {startAttendanceId ? (
                <Image src={CheckedMark} alt="Centang" />
              ) : (
                <Image src={UncheckedMark} alt="Silang" />
              )}
              <span
                className={`poppins-medium text-base ${isToday ? 'text-white' : 'text-black'}`}
              >
                Presensi Awal
              </span>
            </div>

            {/* End attendance status */}
            <div className="w-fit h-fit flex items-center gap-1.5">
              {endAttendanceId ? (
                <Image src={CheckedMark} alt="Centang" />
              ) : (
                <Image src={UncheckedMark} alt="Silang" />
              )}
              <span
                className={`poppins-medium text-base ${isToday ? 'text-white' : 'text-black'}`}
              >
                Presensi Akhir
              </span>
            </div>
          </div>
        </div>

        <div className="transition-transform ease-in-out duration-150 mr-3 group-hover:translate-x-2">
          <RightArrow fillColor={isToday ? '#FCFCFC' : '#1C1C1C'} />
        </div>
      </div>
    </div>
  )
}

export default Card
