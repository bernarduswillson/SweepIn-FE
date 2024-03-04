import React, { useState, useEffect } from 'react'

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
      <div className={`bg-white p-5 rounded-md w-[500px] transition-transform ease-in-out duration-300 transform scale-${isOpen ? '100' : '90'}`}>
        <p className="text-lg text-blue_main font-bold mb-3 text-center">Akun anda belum terdaftar, coba masuk menggunakan akun lain.</p>
        <div className='flex justify-center'>
          <button onClick={handleConfirm} className="font-bold mt-5 px-7 py-2 bg-green_main text-white rounded-3xl hover:opacity-80 transition-all">
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertBox