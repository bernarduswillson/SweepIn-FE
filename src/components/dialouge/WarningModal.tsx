import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import RedButton from '../buttons/RedButton';

interface ModalProps {
  title: string,
  msg: string,
  img?: any,
  imgAlt?: string,
  confirmText: string,
  cancelText?: string,
  onConfirm: () => void,
  onClose: () => void,
  isOpen: Boolean,
}

const WarningModal = (props: ModalProps): JSX.Element => {
  const {
    title,
    msg,
    img,
    imgAlt,
    confirmText,
    cancelText,
    onConfirm,
    onClose,
    isOpen
  } = props

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed z-50 backdrop-blur inset-0 flex items-center justify-center bg-scrim`}
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
            className={`max-w-[500px] w-11/12 p-5 pt-10 bg-neutral-100 rounded-md flex flex-col items-center`}
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
            {img && imgAlt && (
              <Image src={img} alt={imgAlt} className="mb-7" />
            )}

            <h2
              className={`mb-1 text-primary-500 header-3 text-center`}
            >
              {title}
            </h2>

            <p className="mb-7 text-neutral-900 body-m text-center">
              {msg}
            </p>

            <div className="flex justify-center items-center gap-5">
              <RedButton 
                text={confirmText}
                size='medium'
                type='primary'
                roundness='round'
                onClick={onConfirm}
              />
              {
                cancelText && (
                  <RedButton 
                    text={cancelText}
                    size='medium'
                    type='secondary'
                    roundness='round'
                    onClick={onClose}
                  />
                )
              }
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export default WarningModal;
