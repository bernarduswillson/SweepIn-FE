"use client"

// Imports
import React, { useState, useEffect } from 'react';

// Components
import FormHeader from '@/components/ui/FormHeader';
import AttendancePhotoInput from '@/components/ui/AttendancePhotoInput';
import SubmitButton from '@/components/ui/SubmitButton';

// Utils
import getTodayDate from '@/utils/getTodayDate';
import getTodayString from '@/utils/getTodayString';
import parseTime from '@/utils/parseTime';

// Interface
import Log from '@/interface/Log';

// Data
import sessionDummy from '@/data/sessionDummy.json';

const FormPresensi = () => {
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
  const getLoc = ():number[] => {
    let pos:number[] = []
    navigator.geolocation.getCurrentPosition((position) => {
      pos[0] = position.coords.latitude
      pos[1] = position.coords.longitude
    }, (error) => {
      alert('Error getting location:');
    }, defaultSettings);
    return pos
  }

  // Update time and location when photo is updated
  useEffect(() => {
    if (formData.photo) {
      const pos = getLoc();
      setFormData((prev) => ({
        ...prev,
        time: new Date(),
        lat: pos[0],
        long: pos[1]
      }))
    }
  }, [formData.photo]);

  // Handle submit
  const handleSubmit = () => {
    
  };

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">

      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Presensi Awal' date={getTodayDate()} />
        <AttendancePhotoInput photo={formData.photo} setPhoto={handleInputChange} />
      </div>
  
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className='w-11/12 h-fit flex flex-col'>
          <h4 className="text-green_main text-base poppins-bold">Nama</h4>
          <h3 className="text-black text-xl poppins-medium">{sessionDummy.name}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
          <h3 className="text-black text-xl poppins-medium">{getTodayString()}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Waktu</h4>
          <h3 className="text-black text-xl poppins-medium">{formData.time ? parseTime(formData.time) : ':-:'}</h3>
          <h4 className="text-green_main text-base mt-5 poppins-bold">Lokasi</h4>

          {
            formData.long && 
            formData.lat &&
            <iframe src={`https://maps.google.com/maps?q=${formData.lat},${formData.long}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
          }

          <div className="flex flex-col items-center pt-10">
            <SubmitButton text='Kirim' onClick={() => {}} disable={!formData.photo || !formData.time || !formData.long || !formData.lat }/>
          </div>
        </div>

      </div>
    </div>

  );
};

export default FormPresensi;
