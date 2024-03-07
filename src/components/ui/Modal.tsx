import React, { useState, useEffect } from 'react'

interface ModalProps {
  title: String,
  msg: String,
  type: 'info' | 'danger',
  confirmText: String,
  cancelText?: String,
  onConfirm: () => void,
  onClose: () => void,
};

const Modal = (props: ModalProps): JSX.Element => {
  const { title, msg, type, confirmText, onConfirm, cancelText, onClose } = props;

  const [isOpen, setIsOpen] = useState(true)

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsOpen(true)
  //   }, 50)

  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [])

  const handleConfirm = (): void => {
    setIsOpen(false)
    setTimeout(() => {
      onConfirm()
    }, 300)
  }

  return (
    <div className={`fixed z-[50] inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className='fixed w-full h-full inset-0' onClick={onClose}/>

      <div className={`bg-white max-w-[500px] w-11/12 p-5 pt-10 rounded-md transition-transform ease-in-out duration-300 transform scale-${isOpen ? '100' : '0'}`}>
        <h2 className={`mb-1 text-lg ${type === 'info' ? 'text-blue_main' : 'text-red'} poppins-bold text-center`}>{title}</h2>
        <p className="text-md text-black poppins-medium mb-7 text-center">{msg}</p>
        <div className='flex justify-center items-center gap-5'>
          <button onClick={handleConfirm} className={`poppins-medium px-7 py-2 text-white rounded-3xl border-solid border-[3px] button-animation ${type === 'info' ? 'bg-green_main border-green_main hover:bg-green_dark hover:border-green_dark' : 'bg-red_main border-red_main hover:bg-red_dark hover:border-red_dark'}`}>
            {confirmText}
          </button>
          {
            cancelText && 
            <button onClick={onClose} className={`poppins-medium px-7 py-2 bg-white text-green_main border-[3px] border-solid rounded-3xl button-animation hover:text-white ${type === 'info' ? 'border-green_main text-green_main hover:bg-green_main' : 'border-red_main text-red_main hover:bg-red_main'}`}>
              {cancelText}
            </button>
          }
        </div>
      </div>

    </div>
  )
}

export default Modal;