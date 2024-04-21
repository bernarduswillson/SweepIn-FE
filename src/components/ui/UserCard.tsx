'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Asset
import RightArrow from '@public/icons/right-arrow-ic'

interface UserCardProps {
  id: String
  email: String
  name: String
  role: String
  location: String
}

const Card = (props: UserCardProps): JSX.Element => {
  const { id, email, name, role, location } = props

  const route = useRouter()

  // Handle card click
  const handleClick = () => {
    route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user/${id}`)
  }

  return (
    <div className="w-full">
      <div
        className="w-full relative rounded-xl flex justify-between items-center cursor-pointer bg-grey_bg p-3 mb-3 group"
        onClick={handleClick}
      >
        <div className="w-full flex flex-col">
          {/* Role */}
          <div className="poppins-bold text-sm text-blue_main">{role}</div>

          {/* Name */}
          <div className="poppins-bold text-2xl text-black">{name}</div>

          {/* Location */}
          <div className="poppins-bold text-sm">{location}</div>
        </div>

        <div className="transition-transform ease-in-out duration-150 mr-3 group-hover:translate-x-2">
          <RightArrow fillColor="#1C1C1C" />
        </div>
      </div>
    </div>
  )
}

export default Card
