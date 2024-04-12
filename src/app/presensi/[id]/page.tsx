"use client"

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import axios from 'axios';

// Components
import FormHeader from '@/components/ui/FormHeader';
import AttendancePhoto from '@/components/ui/AttendacePhoto';
import PreLoader from '@/components/PreLoader';

// Interface
import FetchedAttendance from '@/interface/FetchedAttendance';

// Utils
import { date2String, dateTime2String, dateTimeRange2String } from '@/utils/date';

const DetailPresensi = () => {
  // Get attendance id
  const { id } = useParams();

  // Fetch data
  const [data, setData] = useState<FetchedAttendance>();
  const [ loading, setLoading] = useState<boolean>(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/attendance/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <AnimatePresence>
      {
        loading ||
        !data ?
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
            <FormHeader title='Presensi' date={data.date} />
            <AttendancePhoto startPhoto={data.startLog.images[0]} endPhoto={data.endLog?.images[0]} />
          </div>
      
          {/* Body */}
          <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
            <div className='w-11/12 h-fit flex flex-col'>
              {/* Text input */}
              <h4 className="text-green_main text-base poppins-bold">Nama</h4>
              INI HARUS NGUBAH BACKEND
              {/* <h3 className="text-black text-xl poppins-medium">{data.user.name}</h3> */}
              <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
              <h3 className="text-black text-xl poppins-medium">{date2String(new Date(data.date))}</h3>
              <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
              <h3 className="text-black text-xl poppins-medium">{data.endLog ? dateTimeRange2String(new Date(data.startLog.date), new Date(data.endLog.date)) : dateTime2String(new Date(data.startLog.date))}</h3>

              {/* Map */}
              <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Awal</h4>
              <div className='my-2 rounded-xl overflow-hidden'>
                <iframe src={`https://maps.google.com/maps?q=${data.startLog.latitude},${data.startLog.longitude}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
              </div>
              { 
                data.endLog &&
                <>
                  <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Akhir</h4>
                  <div className='my-2 rounded-xl overflow-hidden'>
                    <iframe src={`https://maps.google.com/maps?q=${data.endLog.latitude},${data.startLog.longitude}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
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
