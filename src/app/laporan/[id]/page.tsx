"use client"

// Components
import { useEffect, useState } from 'react';
import FormHeader from '@/components/ui/FormHeader';
import ReportGallery from '@/components/ui/ReportGallery';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

// Utils
import { getTodayDate, date2String } from '@/utils/date';

// Interface
import Report from '@/interface/Report';

const FormLaporan = (): JSX.Element => {
  const { id } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {(
      async function() {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report/${id}`);
          if (response.status === 200) {
            const data = response.data;
            console.log(data);
            setImages(data.data.images);
            // setName(data.data.user.name);
            setDate(date2String(new Date(data.data.date), false));
            setStatus(data.data.status);
            setDescription(data.data.description);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )()
  }
  , [id]);

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
    
      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Laporan Kerja' date={getTodayDate()} />
        <ReportGallery photos={images} />
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <label className="text-green_main text-base poppins-bold">Nama</label>
          {/* <h3 className="text-black text-xl poppins-medium">{data.data.user.name}</h3> */}
          <label className="text-green_main text-base mt-5 poppins-bold">Tanggal</label>
          <h3 className="text-black text-xl poppins-medium">{date}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Status</label>
          <h3 className="text-black text-xl poppins-medium">{status}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Deskripsi</label>
          <p className='text-base poppins-medium text-black'>{description}</p>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;