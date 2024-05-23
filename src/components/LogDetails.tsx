// Imports
import Image from 'next/image'
import { date2String, dateTime2String } from '@/utils/date'
import { useState } from 'react'

// Interface
import Log from '@/interface/FetchedLog'

// Components
import Modal from '@/components/ui/Modal'

// Utils
import bufferToBase64 from '@/utils/image'

interface LogDetailsProps {
  data: Log
}

const LogDetails = (props: LogDetailsProps): JSX.Element => {
  const { data } = props
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [modalPhoto, setModalPhoto] = useState<string | undefined>(undefined)

  const photoBase64 = data.images[0]
    ? bufferToBase64(data.images[0].data)
    : undefined

  const handleOpenModal = (photo: string | undefined) => {
    setModalPhoto(photo)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalPhoto(undefined)
  }

  return (
    <div className="w-full">
      <Modal
        title=""
        msg=""
        type="info"
        previewImg={modalPhoto}
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />

      {/* Photo */}
      <div className="mb-7">
        <h2 className="poppins-bold text-blue_main">Foto</h2>
        <div className="relative w-72 h-72 ">
        {photoBase64 ? (
          <button onClick={() => handleOpenModal(photoBase64)}>
            <Image
              src={`data:image/png;base64,${photoBase64}`}
              alt="Foto kehadiran"
              fill={true}
              objectFit="cover"
              className="rounded-[7px]"
            />
          </button>
        ) : (
          <div className="w-72 h-72 flex justify-center items-center">
            No image available
          </div>
        )}
        </div>
      </div>

      {/* Date */}
      <div className="mb-7">
        <h2 className="poppins-bold text-blue_main">Tanggal</h2>
        <h3 className="text-black text-xl poppins-medium">
          {date2String(new Date(data.date))}
        </h3>
      </div>

      {/* Time */}
      <div className="mb-7">
        <h2 className="poppins-bold text-blue_main">Waktu</h2>
        <h3 className="text-black text-xl poppins-medium">
          {dateTime2String(new Date(data.date))}
        </h3>
      </div>

      {/* Location */}
      <div className="mb-7">
        <h2 className="poppins-bold text-blue_main">Lokasi</h2>
        <div className="my-2 rounded-xl overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`}
            width="90%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default LogDetails
