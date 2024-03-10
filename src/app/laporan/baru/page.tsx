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
  const route = useRouter();

  // Are inputs valid
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // List of photos
  const [photos, setPhotos] = useState<File[]>([]);

  // Description data
  const [desc, setDesc] = useState<string>('');

  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  }

  // Check is inputs are valid
  useEffect(() => {
    if (photos.length > 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  }, [photos.length]);

  // handle submit
  const handleSubmit = () => {
    if (isInputValid) {
      setIsLoading(true)
      // TODO: Post API
      setTimeout(() => {
        setIsLoading(false);
        route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan`);
      }, 5000)
    }
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
            <SubmitButton text='Kirim' onClick={handleSubmit} loading={isLoading} disable={!isInputValid}/>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;