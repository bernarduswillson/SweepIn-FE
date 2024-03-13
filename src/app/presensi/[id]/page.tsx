"use client"

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

// Components
import FormHeader from '@/components/ui/FormHeader';
import AttendancePhoto from '@/components/ui/AttendacePhoto';
import PreLoader from '@/components/PreLoader';

// Utils
import { date2String, dateTimeRange2String } from '@/utils/date';

const DetailPresensi = () => {
  const { id } = useParams();
  const [imageStart, setImageStart] = useState<string>('');
  const [imageEnd, setImageEnd] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [startLocation, setStartLocation] = useState<string[]>([]);
  const [endLocation, setEndLocation] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const { data, loading } = useFetch(`/attendance/${id}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/attendance/${id}`);
        const data = response.data.data;
        console.log(data);
        setImageStart(data.startLog[0].image);
        setImageEnd(data.endLog[0].image);
        setDate(date2String(new Date(data.date)));
        setName(data.user.name);
        setTime(dateTimeRange2String(new Date(data.startLog[0].date), new Date(data.endLog[0].date)));
        setStartLocation([data.startLog[0].latitude, data.startLog[0].longitude]);
        setEndLocation([data.endLog[0].latitude, data.endLog[0].longitude]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id, startLocation]);

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
            <FormHeader title='Presensi' date={date} />
            <AttendancePhoto startPhoto={imageStart} endPhoto={imageEnd} />
          </div>
      
          {/* Body */}
          <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
            <div className='w-11/12 h-fit flex flex-col'>
              {/* Text input */}
              <h4 className="text-green_main text-base poppins-bold">Nama</h4>
              <h3 className="text-black text-xl poppins-medium">{name}</h3>
              <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
              <h3 className="text-black text-xl poppins-medium">{date}</h3>
              <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
              <h3 className="text-black text-xl poppins-medium">{time}</h3>

              {/* Map */}
              <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Awal</h4>
              <div className='my-2 rounded-xl overflow-hidden'>
                <iframe src={`https://maps.google.com/maps?q=${startLocation[0]},${startLocation[1]}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
              </div>
              { 
                endLocation &&
                <>
                  <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi Akhir</h4>
                  <div className='my-2 rounded-xl overflow-hidden'>
                    <iframe src={`https://maps.google.com/maps?q=${endLocation[0]},${endLocation[1]}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
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
