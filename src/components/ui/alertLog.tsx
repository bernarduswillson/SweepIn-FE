import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface AlertProps {
  onConfirm: () => void
  onCancel: () => void
}

const AlertBox = ({ onConfirm, onCancel }: AlertProps): JSX.Element => {
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

  const handleCancel = (): void => {
    setIsOpen(false)
    setTimeout(() => {
      onCancel()
    }, 300)
  }

  return (
    <div className={`z-[50] fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-[10vw] font-montserrat transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-5 rounded-md w-[500px] transition-transform ease-in-out duration-300 transform scale-${isOpen ? '100' : '90'}`}>
        <p className="text-lg text-blue_main font-bold mb-3 text-center">Apakah anda yakin ingin keluar?</p>
        <div className='flex justify-between'>
          <button onClick={handleCancel} className="font-bold mt-5 px-7 py-2 bg-grey text-white rounded-3xl hover:opacity-80 transition-all">
            Cancel
          </button>
          <button onClick={handleConfirm} className="font-bold mt-5 px-7 py-2 bg-red text-white rounded-3xl hover:opacity-80 transition-all">
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertBox