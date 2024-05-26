import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Asset
import carouselRightArrow from '@public/icons/carousel-right-arrow-ic.svg'
import carouselLeftArrow from '@public/icons/carousel-left-arrow-ic.svg'

// Components
import Modal from '@/components/ui/Modal'

// Utils
import bufferToBase64 from '@/utils/image'

interface AttendancePhotoProps {
  startPhoto:
    | {
        type: string
        data: number[]
      }
    | undefined
  endPhoto:
    | {
        type: string
        data: number[]
      }
    | undefined
}

const AttendancePhoto: React.FC<AttendancePhotoProps> = ({
  startPhoto,
  endPhoto
}) => {
  const [page, setPage] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [modalPhoto, setModalPhoto] = useState<string | undefined>(undefined)

  const paginate = (newPage: number) => {
    setPage(newPage)
  }

  const startPhotoBase64 = startPhoto ? bufferToBase64(startPhoto.data) : undefined
  const endPhotoBase64 = endPhoto ? bufferToBase64(endPhoto.data) : undefined
  const handleOpenModal = (photo: string | undefined) => {
    setModalPhoto(photo)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalPhoto(undefined)
  }

  return (
    <div className="w-full relative h-fit mt-14 flex justify-center">
      <Modal
        title=""
        msg=""
        type="info"
        previewImg={modalPhoto}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />

      <div className="w-fit h-72 flex justify-between items-center gap-5">
        <div
          className={`relative w-10 h-10 transition-opacity duration-150 ease-in-out ${!endPhoto || page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-1 cursor-pointer'} hover:opacity-70`}
          onClick={() => paginate(0)}
        >
          <Image
            src={carouselLeftArrow}
            alt="panah kiri"
            fill={true}
            objectFit="cover"
          />
        </div>

        <div className="relative w-72 h-72 flex justify-between items-center">
          <AnimatePresence initial={false}>
            {page === 0 && startPhotoBase64 && (
              <motion.div
                key={1}
                className={`absolute w-72 h-72 overflow-hidden flex justify-center items-center border-[5px] border-white rounded-xl`}
                initial={{
                  zIndex: 0,
                  opacity: 0,
                  x: -100
                }}
                animate={{
                  zIndex: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
                exit={{
                  zIndex: 0,
                  opacity: 0,
                  x: -100,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
              >
                <button onClick={() => handleOpenModal(startPhotoBase64)}>
                  <Image
                    src={`data:image/png;base64,${startPhotoBase64}`}
                    alt="Foto kehadiran"
                    fill={true}
                    objectFit="cover"
                    className="rounded-[7px]"
                  />
                </button>
              </motion.div>
            )}
            {endPhotoBase64 && page === 1 && (
              <motion.div
                key={2}
                className={`absolute w-72 h-72 overflow-hidden flex justify-center items-center border-[5px] border-white rounded-xl`}
                initial={{
                  zIndex: 0,
                  opacity: 0,
                  x: 100
                }}
                animate={{
                  zIndex: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
                exit={{
                  zIndex: 0,
                  opacity: 0,
                  x: 100,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
              >
                <button onClick={() => handleOpenModal(endPhotoBase64)}>
                  <Image
                    src={`data:image/png;base64,${endPhotoBase64}`}
                    alt="Foto kehadiran"
                    fill={true}
                    objectFit="cover"
                    className="rounded-[7px]"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`relative w-10 h-10 transition-opacity duration-150 ease-in-out ${!endPhoto || page === 1 ? 'opacity-0 pointer-events-none' : 'opacity-1 cursor-pointer'} hover:opacity-70`}
          onClick={() => paginate(1)}
        >
          <Image
            src={carouselRightArrow}
            alt="panah kanan"
            fill={true}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

export default AttendancePhoto
