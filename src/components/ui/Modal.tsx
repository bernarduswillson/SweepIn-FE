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
    <div className={`fixed z-[50] inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white max-w-[500px] w-11/12 p-5 pt-10 rounded-md transition-transform ease-in-out duration-300 transform scale-${isOpen ? '100' : '0'}`}>
        <h2 className='mb-1 text-lg text-blue_main poppins-bold text-center'>Akun tidak ditemukan</h2>
        <p className="text-md text-black poppins-medium mb-7 text-center">Akun anda belum terdaftar, coba masuk menggunakan akun lain atau hubungi admin.</p>
        <div className='flex justify-center'>
          <button onClick={handleConfirm} className="poppins-medium px-7 py-2 bg-green_main text-white rounded-3xl hover:bg-green_dark button-animation">
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertBox