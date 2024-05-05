// Imports
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Components
import Dropdown from '@/components/ui/customDropdown'

// Interface
import Report from '@/interface/FetchedReport'

// Utils
import bufferToBase64 from '@/utils/image'
import { date2String, dateTime2String } from '@/utils/date'
import { set } from 'date-fns'

interface ReportDetailsProps {
  data: Report
  loading: boolean
  onChange: (value: string) => void
}

const ReportDetails = (props: ReportDetailsProps): JSX.Element => {
  const { data, loading, onChange } = props

  // Form data
  const [status, setStatus] = useState<string>('')

  // Set form data
  useEffect(() => {
    if (data) {
      if (data.status === 'WAITING') {
        setStatus('DIPROSES')
      } else if (data.status === 'REJECTED') {
        setStatus('DITOLAK')
      } else if (data.status === 'ACCEPTED') {
        setStatus('DITERIMA')
      }
    }
  }, [data])

  // Handle value change
  const handleValueChange = (value: string) => {
    setStatus(value)
    if (value === 'DIPROSES') {
      onChange('WAITING')
    } else if (value === 'DITOLAK') {
      onChange('REJECTED')
    } else if (value === 'DITERIMA') {
      onChange('ACCEPTED')
    }
  }

  if (loading) {
    return <div></div>
  }

  const photosBase64 = data.images.map((photo) => bufferToBase64(photo.data))

  return (
    <div className="">
      <h2 className="poppins-extrabold text-lg mb-2">Pengguna</h2>
      {/* Name */}
      <h3 className="poppins-bold text-blue_main mb-10">{data.user?.name}</h3>

      {/* Laporan */}
      <div className="w-full">
        <h2 className="poppins-extrabold text-lg mb-5">Laporan</h2>

        {/* Photo */}
        <div className="mb-7">
          <h2 className="poppins-bold text-blue_main">Foto</h2>
          <div className="max-w-[355px] w-full flex flex-wrap justify-left gap-[15px]">
            {photosBase64 && photosBase64.length > 0 ? (
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
              ))
            ) : (
              <p>No photos available</p>
            )}
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
              <Dropdown
                label="Status"
                placeholder="Ganti Status"
                onChange={(value) => handleValueChange(value)}
                value={status}
                options={['DIPROSES', 'DITOLAK', 'DITERIMA']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportDetails
