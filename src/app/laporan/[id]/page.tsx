"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import FormHeader from '@/components/ui/FormHeader';

// Utils
import getTodayDate from '@/utils/getTodayDate';
import SubmitButton from '@/components/ui/SubmitButton';
import getTodayString from '@/utils/getTodayString';
import ReportGalleryInput from '@/components/ui/ReportGalleryInput';

const FormLaporan = (): JSX.Element => {
  // List of photos
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
    
      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Laporan Kerja' date={getTodayDate()} />
        <ReportGalleryInput photos={photos} setPhotos={setPhotos} />
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <label className="text-green_main text-base poppins-bold">Nama</label>
          <h3 className="text-black text-xl poppins-medium">Ditra Rizqa Amadia</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Tanggal</label>
          <h3 className="text-black text-xl poppins-medium">{getTodayString()}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Deskripsi</label>
          <p className='text-base poppins-medium text-black'>Test</p>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;