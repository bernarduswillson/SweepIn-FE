// Imports
import React from 'react';
import Image from 'next/image';

// Interface
import Log from '@/interface/FetchedLog';

// Utils
import bufferToBase64 from '@/utils/image';
import { date2String, dateTime2String } from '@/utils/date';

interface LogDetailsProps {
  data: Log
}

const LogDetails = (props: LogDetailsProps): JSX.Element => {
  const { data } = props;

  const photoBase64 = data.images[0] ? bufferToBase64(data.images[0].data) : undefined

  return (
    <div className='w-full'>
      {/* Photo */}
      <div className='mb-7'>
        <h2 className="poppins-bold text-blue_main">Foto</h2>
        <div className='relative w-72 h-72 '>
          <Image src={`data:image/png;base64,${photoBase64}`} alt="Foto kehadiran" fill={true} objectFit='cover' className='rounded-[7px]'/>
        </div>
      </div>

      {/* Date */}
      <div className='mb-7'>
        <h2 className="poppins-bold text-blue_main">Tanggal</h2>
        <h3 className="text-black text-xl poppins-medium">{date2String(new Date(data.date))}</h3>
      </div>

      {/* Time */}
      <div className='mb-7'>
        <h2 className="poppins-bold text-blue_main">Waktu</h2>
        <h3 className="text-black text-xl poppins-medium">{dateTime2String(new Date(data.date))}</h3>
      </div>

      {/* Lokasi */}
      <div className='mb-7'>
        <h2 className="poppins-bold text-blue_main">Lokasi</h2>
        <div className='my-2 rounded-xl overflow-hidden'>
          <iframe src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`} width="90%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
};

export default LogDetails;