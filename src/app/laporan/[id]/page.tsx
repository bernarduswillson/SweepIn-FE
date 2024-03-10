"use client"

// Components
import FormHeader from '@/components/ui/FormHeader';
import ReportGallery from '@/components/ui/ReportGallery';

// Data TEST: Dummy
import reportDetailDummy from '@/data/reportDetailDummy.json';

// Utils
import { getTodayDate, date2String } from '@/utils/date';

const FormLaporan = (): JSX.Element => {

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
    
      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Laporan Kerja' date={getTodayDate()} />
        <ReportGallery photos={reportDetailDummy.verifiedImages}/>
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <label className="text-green_main text-base poppins-bold">Nama</label>
          <h3 className="text-black text-xl poppins-medium">{reportDetailDummy.name}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Tanggal</label>
          <h3 className="text-black text-xl poppins-medium">{date2String(new Date(reportDetailDummy.date), false)}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Status</label>
          <h3 className="text-black text-xl poppins-medium">{reportDetailDummy.status}</h3>
          <label className="text-green_main text-base mt-5 poppins-bold">Deskripsi</label>
          <p className='text-base poppins-medium text-black'>{reportDetailDummy.description}</p>
        </div>
      </div>
    </div>
  );
};
  
export default FormLaporan;