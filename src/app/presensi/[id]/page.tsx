"use client"

import React from 'react';

// Components
import FormHeader from '@/components/ui/FormHeader';

// Utils
import { date2String, dateTimeRange2String } from '@/utils/date';

// Data TEST: Dummy
import attendanceDetailDummy from '@/data/attendanceDetailDummy.json';
import AttendancePhoto from '@/components/ui/AttendacePhoto';

const FormPresensi = () => {
  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">

      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Presensi' date={new Date(attendanceDetailDummy.date)} />
        <AttendancePhoto startPhoto={attendanceDetailDummy.startLog.verifiedImage} endPhoto={attendanceDetailDummy.endLog.verifiedImage} />
      </div>
  
      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <h4 className="text-green_main text-base poppins-bold">Nama</h4>
          <h3 className="text-black text-xl poppins-medium">{attendanceDetailDummy.name}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
          <h3 className="text-black text-xl poppins-medium">{date2String(new Date(attendanceDetailDummy.date), false)}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
          <h3 className="text-black text-xl poppins-medium">{dateTimeRange2String(new Date(attendanceDetailDummy.startLog.submitTime), new Date(attendanceDetailDummy.endLog.submitTime))}</h3>

          {/* Map */}
          <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Awal</h4>
          <div className='my-2 rounded-xl overflow-hidden'>
            <iframe src={`https://maps.google.com/maps?q=${attendanceDetailDummy.startLog.lat},${attendanceDetailDummy.startLog.long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
          </div>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Akhir</h4>
          <div className='my-2 rounded-xl overflow-hidden'>
            <iframe src={`https://maps.google.com/maps?q=${attendanceDetailDummy.endLog.lat},${attendanceDetailDummy.endLog.long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FormPresensi;
