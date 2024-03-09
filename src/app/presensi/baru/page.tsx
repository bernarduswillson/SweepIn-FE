"use client"

// Imports
import React, { useState } from 'react';
import Image from 'next/image';

// Components
import FormHeader from '@/components/ui/FormHeader';

// Utils
import getTodayDate from '@/utils/getTodayDate';
import AttendancePhotoInput from '@/components/ui/AttendancePhotoInput';

// Data Presensi Props
interface DataPresensiProps {
  nama: string;
  tanggal: Date;
  waktu: string;
  lokasi: string;
}

// Data Presensi Dummy
const dummyData: DataPresensiProps = {
  nama: 'Bernardus Willson',
  tanggal: new Date('2022-10-10'),
  waktu: '',
  lokasi: ''
}

const FormPresensi = () => {
  // Form data
  const [formData, setFormData] = useState({
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

  // Get Today's Date
  const getToday = () => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();
    
    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }
  
  // Get Time
  const [timeTaken, setTimeTaken] = useState('-');
  const getTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    return `${hours}.${minutes} WIB`;
  }

  // Capture Photo
  const [photo, setPhoto] = useState<string>('');

  // Get Location
  type Coordinates = {
      lat: number;
      lng: number;
  };
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const defaultSettings = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const getLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, (error) => {
      alert('Error getting location:');
    }, defaultSettings);
  }

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">

      {/* Head */}
      <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
        <FormHeader title='Presensi Awal' date={getTodayDate()} />
        <AttendancePhotoInput photo={formData.photo} setPhoto={handleInputChange} />
      </div>
  
      {/* <div className="h-auto max-w-[800px] w-full bg-white bottom-0 relative rounded-t-3xl flex flex-col py-10 px-[5vw]">
        <div className='font-bold'>
          <h4 className="text-green_main text-md">Nama</h4>
          <h3 className="text-black text-xl ">{dummyData.nama}</h3>
          <h4 className="text-green_main text-md mt-5">Tanggal</h4>
          <h3 className="text-black text-xl">{getToday()}</h3>
          <h4 className="text-green_main text-md mt-5">Waktu</h4>
          <h3 className="text-black text-xl">{timeTaken}</h3>
          <h4 className="text-green_main text-md mt-5">Lokasi</h4>

          {coordinates && (
              <iframe src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
          )}
        </div>

        <div className="flex flex-col items-center pt-10">
          <button className={`bg-blue_main w-full max-w-[400px] text-white text-xl font-bold rounded-lg mt-2 py-1.5 ${photo ? 'opacity-100 hover:opacity-70 ' : 'opacity-40'}`} disabled={photo ? false : true}>Kirim</button>
        </div>

      </div> */}
    </div>

  );
};

export default FormPresensi;
