"use client"

import React, { useState, useEffect } from 'react';

// Asset
import MapMissing from '@public/images/map-missing.svg'
import { useRouter } from 'next/navigation';

// Components
import FormHeader from '@/components/ui/FormHeader';
import AttendancePhotoInput from '@/components/ui/AttendancePhotoInput';
import SubmitButton from '@/components/ui/SubmitButton';
import Modal from '@/components/ui/Modal';

// Utils
import { date2String, dateTimeRange2String } from '@/utils/date';

// Interface
import Log from '@/interface/Log';

// Data TEST: Dummy
import sessionDummy from '@/data/sessionDummy.json';
import attendanceDetailDummy from '@/data/attendanceDetailDummy.json';

const FormPresensi = () => {
  const route = useRouter();

  // Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  // Location not found state
  const [isLocationError, setIsLocationError] = useState<boolean>(false);

  // Form data
  const [formData, setFormData] = useState<Log>({
    userId: sessionDummy.userId,
    photo: '',
    time: undefined,
    lat: undefined,
    long: undefined
  });

  // handle input change
  const handleInputChange = (name: string, value: string | Date | number | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  } 

  // Get Location
  const defaultSettings = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const getLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setFormData((prev) => ({
        ...prev,
        time: new Date(),
        lat: position.coords.latitude,
        long: position.coords.longitude
      }))
    }, (error) => {
      setIsLocationError(true)
    }, defaultSettings);
  }

  // Update time and location when photo is updated
  useEffect(() => {
    if (formData.photo) {
      setFormData((prev) => ({
        ...prev,
        time: new Date(),
      }))
      getLoc();
    }
  }, [formData.photo]);

  // Handle submit
  const handleSubmit = () => {
    // TEST: Loading
    setIsSubmitLoading(true);
    setTimeout(() => {
      setIsSubmitLoading(false);
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi`);
    }, 5000)
  };

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">

      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Presensi' date={new Date(attendanceDetailDummy.date)} />
        <AttendancePhotoInput photo={formData.photo} setPhoto={handleInputChange} />
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
