import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  title: String
  msg: String
  type: 'info' | 'danger'
  confirmText: String
  onConfirm: () => void
  onClose: () => void
  isOpen: Boolean
  img?: any
  cancelText?: String
}

const Modal = (props: ModalProps): JSX.Element => {
  const {
    title,
    msg,
    img,
    type,
    confirmText,
    onConfirm,
    cancelText,
    onClose,
    isOpen
  } = props

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed z-[50] backdrop-blur inset-0 flex items-center justify-center bg-black bg-opacity-60`}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.2
            }
          }}
        >
          <div className="fixed w-full h-full inset-0" onClick={onClose} />

          <motion.div
            className={`flex flex-col items-center bg-white max-w-[500px] w-11/12 p-5 pt-10 rounded-md`}
            initial={{
              scale: 0,
              rotate: '12.5deg'
            }}
            animate={{
              scale: 1,
              rotate: '0deg',
              transition: {
                duration: 0.3,
                ease: 'backOut'
              }
            }}
            exit={{
              scale: 0,
              rotate: '0deg',
              transition: {
                duration: 0.3,
                ease: 'backIn'
              }
            }}
          >
            {img && (
              <Image src={img} alt="Lokasi tidak ditemukan" className="mb-7" />
            )}

            <h2
              className={`mb-1 text-lg ${type === 'info' ? 'text-blue_main' : 'text-red'} poppins-bold text-center`}
            >
              {title}
            </h2>

            <p className="text-md text-black poppins-medium mb-7 text-center">
              {msg}
            </p>

            <div className="flex justify-center items-center gap-5">
              <button
                onClick={onConfirm}
                className={`poppins-medium px-7 py-2 text-white rounded-3xl border-solid border-[3px] button-animation ${type === 'info' ? 'bg-green_main border-green_main hover:bg-green_dark hover:border-green_dark' : 'bg-red_main border-red_main hover:bg-red_dark hover:border-red_dark'}`}
              >
                {confirmText}
              </button>
              {cancelText && (
                <button
                  onClick={onClose}
                  className={`poppins-medium px-7 py-2 bg-white text-green_main border-[3px] border-solid rounded-3xl button-animation hover:text-white ${type === 'info' ? 'border-green_main text-green_main hover:bg-green_main' : 'border-red_main text-red_main hover:bg-red_main'}`}
                >
                  {cancelText}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
