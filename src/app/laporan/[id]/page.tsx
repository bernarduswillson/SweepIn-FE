"use client"

// Components
import { useEffect, useState } from 'react';
import FormHeader from '@/components/ui/FormHeader';
import ReportGallery from '@/components/ui/ReportGallery';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Utils
import { getTodayDate, date2String } from '@/utils/date';

// Interface
import FetchedReport from '@/interface/FetchedReport';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { parseStatus } from '@/utils/status';

const FormLaporan = (): JSX.Element => {
  const { id } = useParams();

  const { data: session } = useSession();

  // User data
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  // Fetched data
  const [report, setReport] = useState<FetchedReport>({
    userId: '',
    date: '',
    status: '',
    description: '',
    images: [],
  });

  // Fetch data
  useEffect(() => {(
    async function() {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report/${id}`);
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setReport({
            userId: data.data.userId,
            date: date2String(new Date(data.data.date), false),
            status: data.data.status,
            description: data.data.description,
            images: data.data.images,
          });
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
        <FormHeader title='Laporan Kerja' date={date2String(getTodayDate())} />
        <ReportGallery photos={report.images} />
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <label className="text-green_main text-base poppins-bold">Nama</label>
          <h3 className="text-black text-xl poppins-medium">{user?.name}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Tanggal</label>
          <h3 className="text-black text-xl poppins-medium">{report.date}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Status</label>
          <h3 className="text-black text-xl poppins-medium">Laporan {parseStatus(report.status)}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Deskripsi</label>
          <p className='text-base poppins-medium text-black'>{report.description}</p>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;