// Imports
import React from 'react'
import Image from 'next/image'

// Interface
import Report from '@/interface/FetchedReport'

// Utils
import bufferToBase64 from '@/utils/image'
import { date2String, dateTime2String } from '@/utils/date'

interface ReportDetailsProps {
  data: Report
  loading: boolean
}

const ReportDetails = (props: ReportDetailsProps): JSX.Element => {
  const { data, loading } = props

  if (loading) {
    return <div></div>
  }

  const photosBase64 = data.images.map((photo) => bufferToBase64(photo.data))

  return (
    <div className="">
      <h2 className="poppins-extrabold text-lg mb-2">User</h2>
      {/* Name */}
      <h3 className="poppins-bold text-blue_main mb-10">{data.user?.name}</h3>

      {/* Laporan */}
      <div className="w-full">
        <h2 className="poppins-extrabold text-lg mb-5">Laporan</h2>

        {/* Photo */}
        <div className="mb-7">
          <h2 className="poppins-bold text-blue_main">Foto</h2>
          <div className="max-w-[355px] w-full flex flex-wrap justify-left gap-[15px]">
            {photosBase64.length > 0 &&
              photosBase64.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-[170px] h-[170px] bg-grey_bg flex justify-center items-center overflow-hidden rounded-lg"
                >
                  <Image
                    src={`data:image/png;base64,${photo}`}
                    alt="Foto laporan"
                    fill={true}
                    objectFit="cover"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2">
            <div className="mb-7">
              <h2 className="poppins-bold text-blue_main">Tanggal</h2>
              <p className="text-black text-xl poppins-medium">
                {date2String(new Date(data.date))}
              </p>
            </div>
            <div className="mb-7">
              <h2 className="poppins-bold text-blue_main">Deskripsi</h2>
              <p className="text-black text-xl poppins-medium">
                {data.description}
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-7">
              <h2 className="poppins-bold text-blue_main">Waktu</h2>
              <p className="text-black text-xl poppins-medium">
                {dateTime2String(new Date(data.date))}
              </p>
            </div>
            <div className="mb-7">
              <h2 className="poppins-bold text-blue_main">Status</h2>
              <p className="text-black text-xl poppins-medium">{data.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportDetails
