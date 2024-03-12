"use client"

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';

// Components
import FormHeader from '@/components/ui/FormHeader';
import AttendancePhoto from '@/components/ui/AttendacePhoto';
import PreLoader from '@/components/PreLoader';

// Utils
import { date2String, dateTimeRange2String } from '@/utils/date';

const DetailPresensi = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/attendance/${id}`);

  return (
    <AnimatePresence>
      {
        loading ?
        <PreLoader /> :
        <motion.div 
          className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              ease: 'easeInOut',
              duration: 0.5
            }
          }}
          exit={{
            opacity: 0,
            transition: {
              ease: 'easeInOut',
              duration: 0.5
            }
          }}
        >

          {/* Head */}
          <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
            <FormHeader title='Presensi' date={new Date(data.data.date)} />
            <AttendancePhoto startPhoto={data.data.startLog[0].image} endPhoto={data.data.endLog[0] ? data.data.endLog[0].image : null} />
          </div>
      
          {/* Body */}
          <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
            <div className='w-11/12 h-fit flex flex-col'>
              {/* Text input */}
              <h4 className="text-green_main text-base poppins-bold">Nama</h4>
              <h3 className="text-black text-xl poppins-medium">{data.data.user.name}</h3>
              <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
              <h3 className="text-black text-xl poppins-medium">{date2String(new Date(data.data.date), false)}</h3>
              <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
              <h3 className="text-black text-xl poppins-medium">{dateTimeRange2String(new Date(data.data.startLog[0].date), data.data.endLog[0] ? new Date(data.data.endLog[0].date) : null)}</h3>

              {/* Map */}
              <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Awal</h4>
              <div className='my-2 rounded-xl overflow-hidden'>
                <iframe src={`https://maps.google.com/maps?q=${data.data.startLog[0].lat},${data.data.startLog[0].long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
              </div>
              { 
                data.data.endLog[0] &&
                <>
                  <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Akhir</h4>
                  <div className='my-2 rounded-xl overflow-hidden'>
                    <iframe src={`https://maps.google.com/maps?q=${data.data.endLog[0].lat},${data.data.endLog[0].long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
                  </div>
                </>
              }
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>

  );
};

export default DetailPresensi;
