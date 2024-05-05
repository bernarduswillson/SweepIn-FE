'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Asset
import RightArrow from '@public/icons/right-arrow-ic'

// Utils
import { date2String } from '@/utils/date'
import SimpleReportCardProps from '@/interface/SimpleReportCard'

const Card = (props: SimpleReportCardProps): JSX.Element => {
  const { id, username, date } = props

  const route = useRouter()
  const url = usePathname()
  const page = url.split('/')[1]

  // Handle card click
  const handleClick = () => {
    if (page === 'admin') {
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/laporan/${id}`)
    }
  }
  
  return (
    <div className="w-full">
      <div
        className={`w-full relative rounded-xl flex justify-between items-center cursor-pointer bg-grey_bg p-3 group`}
        onClick={handleClick}
      >
        <div className="w-full flex items-center poppins-bold text-base text-black">
          {/* Name */}
          <div className="w-1/3 pr-1">{username}</div>

          {/* Date */}
          <div className="w-1/2 pr-1">{date2String(date)}</div>
        </div>

        <div className="absolute transition-transform ease-in-out duration-150 right-5 group-hover:translate-x-2">
          <RightArrow fillColor="#1C1C1C" />
        </div>
      </div>
    </div>
  )
}

export default Card
