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
        className="w-full relative rounded-xl flex justify-between items-center cursor-pointer bg-grey_bg p-3 group"
        onClick={handleClick}
      >
        <div className="w-full flex items-center poppins-bold text-xl text-black">
          {/* Name */}
          <div className="w-1/4">{name}</div>

          {/* Email */}
          <div className="w-1/4">{email}</div>

          {/* Role */}
          <div className="w-1/4">{role}</div>

          {/* Location */}
          <div className="w-1/4">{location}</div>
        </div>

        <div className="absolute transition-transform ease-in-out duration-150 right-5 group-hover:translate-x-2">
          <RightArrow fillColor="#1C1C1C" />
        </div>
      </div>
    </div>
  )
}

export default Card
