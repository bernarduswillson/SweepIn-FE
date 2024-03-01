import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import Map from '@/images/Presensi/Map.svg'

interface AlertProps {
  onConfirm: () => void
}

const AlertBox = ({ onConfirm }: AlertProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(true)
    }, 50)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const handleConfirm = (): void => {
    setIsOpen(false)
    setTimeout(() => {
      onConfirm()
    }, 300)
  }

  return (
    <div className={`z-[50] fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-[10vw] font-montserrat transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white flex flex-col justify-center items-center p-5 rounded-md w-[500px] transition-transform ease-in-out duration-300 transform scale-${isOpen ? '100' : '90'}`}>
        <Image src={Map} alt='Map' className='py-7' />
        <p className="text-lg text-blue_main font-bold mb-3 text-center">Lokasi tidak ditemukan</p>
        <p className="text-lg text-black font-semibold mb-3 text-center">Nyalakan lokasi pada HP Anda untuk melakukan presensi</p>
        <button onClick={handleConfirm} className="font-bold mt-7 px-7 py-2 bg-green_main text-white rounded-3xl hover:opacity-80 transition-all">
          Okay
        </button>
      </div>
    </div>
  )
}

export default AlertBox