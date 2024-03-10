"use client"

import { ChangeEventHandler, useState } from 'react';

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

  // Description data
  const [desc, setDesc] = useState<string>('');

  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  }

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
          <h4 className="text-green_main text-base poppins-bold">Nama</h4>
          <h3 className="text-black text-xl poppins-medium">Ditra Rizqa Amadia</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
          <h3 className="text-black text-xl poppins-medium">{getTodayString()}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Deskripsi</h4>
          <textarea 
            rows={3} 
            value={desc}
            placeholder='Contoh: Menjaga gerbang kampus'
            className='px-3 py-2 mt-2 bg-grey_bg poppins-medium text-black placeholder:text-grey_text' 
            onChange={handleDescriptionChange}
          />

          {/* Submit button */}
          <div className="flex flex-col items-center pt-10">
            <SubmitButton text='Kirim' onClick={() => {}} loading={false} disable={false}/>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;