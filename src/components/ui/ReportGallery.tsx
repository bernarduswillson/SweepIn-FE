import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Components
import Modal from '@/components/ui/Modal'

// Utils
import bufferToBase64 from '@/utils/image'

interface ReportGalleryProps {
  photos: {
    type: string
    data: number[]
  }[]
}

const ReportGallery = (props: ReportGalleryProps) => {
  const { photos } = props
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [modalPhoto, setModalPhoto] = useState<string | undefined>(undefined)

  const photosBase64 = photos.map((photo) => bufferToBase64(photo.data))
  const handleOpenModal = (photo: string | undefined) => {
    setModalPhoto(photo)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalPhoto(undefined)
  }

  return (
    <div className="w-fit mt-10">
      <Modal
        title=""
        msg=""
        type="info"
        previewImg={modalPhoto}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />

      <div className="max-w-[355px] w-full flex flex-wrap justify-left gap-[15px]">
        {photosBase64.length > 0 &&
          photosBase64.map((photo, index) => (
            <motion.div
              key={index}
              className="relative w-[170px] h-[170px] bg-grey_bg flex justify-center items-center overflow-hidden rounded-lg"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  ease: 'backInOut',
                  duration: 0.3,
                  delay: 0.1 * index
                }
              }}
            >
              <button onClick={() => handleOpenModal(photo)}>
                <Image
                  src={`data:image/png;base64,${photo}`}
                  alt="Foto laporan"
                  fill={true}
                  objectFit="cover"
                />
              </button>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

export default ReportGallery
