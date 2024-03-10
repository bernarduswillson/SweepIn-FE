"use client"

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/ui/searcbar';
import Card from '@/components/ui/card';
import AlertLog from '@/components/ui/alertLog';

const dummyData = [
  {
    date: '12 Januari 2022',
    foto: ['https://www.smksantoaloisius.sch.id/upload/imagecache/55248824poster-kebersihan-membuang-sampah-800x717.jpg', 'https://www.smksantoaloisius.sch.id/upload/imagecache/55248824poster-kebersihan-membuang-sampah-800x717.jpg', 'https://www.smksantoaloisius.sch.id/upload/imagecache/55248824poster-kebersihan-membuang-sampah-800x717.jpg', 'https://www.smksantoaloisius.sch.id/upload/imagecache/55248824poster-kebersihan-membuang-sampah-800x717.jpg'],
    name: 'Bernard',
    desc: 'Menjaga gerbang kampus.'
  },
]

const Presensi = (): JSX.Element => {
  const [showAlert, setShowAlert] = useState(false);
  const handleJoinClick = (): void => {
    setShowAlert(true)
  }
  const handleConfirm = (): void => {
    setShowAlert(false)
  }

  return (
    <div className="relative h-screen flex flex-col items-center gap-5 w-full bg-gradient-to-br from-teal-500 to-blue-600">
      <div className='h-[70vh] w-full px-[5vw] flex flex-col items-center'>
        <div className='text-center font-bold text-white py-8'>
          <div>{dummyData[0].date}</div>
          <div className='text-2xl'>Laporan Kerja</div>
        </div>
        <div className='px-[5vw]'>
          <div className='text-white font-bold mb-2'>Foto Laporan</div>
          <div className='flex flex-wrap justify-between'>
            {dummyData[0].foto.map((foto, index) => (
              <Image
                key={index}
                src={foto}
                alt='foto'
                width={150}
                height={150}
                className='rounded-md mb-3'
              />
            ))}
          </div>
        </div>
      </div>

      <div className='h-[30vh] bg-white w-full rounded-t-2xl px-[5vw]'>
        <div className='mt-5'>
          <h4 className='font-extrabold text-blue_main'>
            Nama
          </h4>
          <h3 className='text-xl font-semibold'>
            {dummyData[0].name}
          </h3>
        </div>
        <div className='mt-3'>
          <h4 className='font-extrabold text-blue_main'>
            Tanggal
          </h4>
          <h3 className='text-xl font-semibold'>
            {dummyData[0].date}
          </h3>
        </div>
        <div className='mt-3'>
          <h4 className='font-extrabold text-blue_main'>
            Deskripsi
          </h4>
          <h3 className='text-md font-semibold'>
            {dummyData[0].desc}
          </h3>
        </div>
      </div>
    </div>
  );
};
  
export default Presensi;