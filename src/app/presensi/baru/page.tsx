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
import getTodayDate from '@/utils/getTodayDate';
import getTodayString from '@/utils/getTodayString';
import parseTime from '@/utils/parseTime';

// Interface
import Log from '@/interface/Log';

// Data
import sessionDummy from '@/data/sessionDummy.json';

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
        <FormHeader title='Presensi Awal' date={getTodayDate()} />
        <AttendancePhotoInput photo={formData.photo} setPhoto={handleInputChange} />
      </div>
  
      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          {/* Text input */}
          <h4 className="text-green_main text-base poppins-bold">Nama</h4>
          <h3 className="text-black text-xl poppins-medium">{sessionDummy.name}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
          <h3 className="text-black text-xl poppins-medium">{getTodayString()}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
          <h3 className="text-black text-xl poppins-medium">{formData.time ? parseTime(formData.time) : ':-:'}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi</h4>

          {/* Map */}
          <div className='my-2 rounded-xl overflow-hidden'>
            {
              formData.long && 
              formData.lat ?
              <iframe src={`https://maps.google.com/maps?q=${formData.lat},${formData.long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe> :
              <div className='opacity-50 pointer-events-none'>
                <iframe src={`https://maps.google.com/maps?q=-6.914744,107.609810&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
              </div>
            }
          </div>

          {/* Submit button */}
          <div className="flex flex-col items-center pt-10">
            <SubmitButton text='Kirim' onClick={handleSubmit} loading={isSubmitLoading} disable={!formData.photo || !formData.time || !formData.long || !formData.lat}/>
          </div>
        </div>
      </div>

      <Modal
        title="Lokasi tidak ditemukan"
        msg="Patikan lokasi pada HP Anda sudah aktif untuk melakukan presensi"
        img={MapMissing}
        type="info"
        confirmText="Oke"
        onConfirm={() => {setIsLocationError(false)}}
        onClose={() => {setIsLocationError(false)}} 
        isOpen={isLocationError}
      />
    </div>

  );
};

export default FormPresensi;
