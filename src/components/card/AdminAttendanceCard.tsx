'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

// Asset
import RightArrow from '@public/icons/right-arrow-ic'
import UncheckedMark from '@public/icons/status-unchecked-ic.svg'
import CheckedMark from '@public/icons/status-checked-ic.svg'

// Utils
import { date2String, dateTime2String } from '@/utils/date'

interface AttendanceCardProps {
  id: String
  username: String
  date: Date
  startAttendance: {
    id: string
    date: Date
  }
  endAttendance: {
    id: string
    date: Date
  }
}

const Card = (props: AttendanceCardProps): JSX.Element => {
  const { id, username, date, startAttendance, endAttendance } = props

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
    } else if (isToday && !startAttendance && !endAttendance) {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/baru`)
      // Routing to end log form
    } else if (isToday && !endAttendance) {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/baru/${id}`)
      // Routing to attendance detail page
    } else {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi/${id}`)
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
          <div className="w-1/4 pr-3">{username}</div>

          {/* Date */}
          <div className="w-1/4 pr-3">{date2String(date)}</div>

          {/* Start */}
          <div className="w-1/4 pr-3">{dateTime2String(new Date(startAttendance?.date))}</div>

          {/* End */}
          <div className="w-1/4 pr-3">{ endAttendance ? dateTime2String(new Date(endAttendance?.date)) : '-' }</div>
        </div>

        <div className="absolute transition-transform ease-in-out duration-150 right-5 group-hover:translate-x-2">
          <RightArrow fillColor="#1C1C1C" />
        </div>
      </div>
    </div>
  )
}

export default Card
