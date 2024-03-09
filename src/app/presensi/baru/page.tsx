"use client"

// Imports
import React, { useState } from 'react';
import Image from 'next/image';
import CreateFormHeader from '@/components/ui/CreateFormHeader';

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
  const [dataPresensi, setDataPresensi] = useState<DataPresensiProps>(dummyData);

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

  // Convert Date
  const convertDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${date.getDate()} ${month} ${year}`;
  }

  // Capture Photo
  const [photo, setPhoto] = useState<string | null>(null);
  const capturePhoto = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
          const imageSrc = URL.createObjectURL(file);
          setPhoto(imageSrc);
          setTimeTaken(getTime());
          getLoc();
      }
    };
    input.click();
  };

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
    <div className="relative h-auto flex flex-col items-center gap-5 w-auto bg-gradient-to-br from-teal-500 to-blue-600">

      {/* Head */}
      <div className='py-10 flex flex-col items-center'>
      <CreateFormHeader title='Presensi Awal' date={dummyData.tanggal} />
        <div className="relative border-[5px] border-white rounded-xl w-72 h-72 mt-10 mb-5">
          {photo ? (<Image src={photo} alt="photo" layout="fill" objectFit="cover" />) : (
            <button onClick={capturePhoto} className="w-full h-full bg-white text-black font-bold text-lg rounded-xl">Ambil Foto</button>
          )}
        </div>
        {photo && (
          <button onClick={capturePhoto} className="bg-white text-blue_main font-semibold text-lg px-9 py-1 rounded-lg hover:opacity-80">Ambil Ulang</button>
        )}
      </div>
  
      {/* Body */}
      <div className="h-auto max-w-[800px] w-full bg-white bottom-0 relative rounded-t-3xl flex flex-col py-10 px-[5vw]">
        <div className='font-bold'>
          <h4 className="text-green_main text-md">Nama</h4>
          <h3 className="text-black text-xl ">{dummyData.nama}</h3>
          <h4 className="text-green_main text-md mt-5">Tanggal</h4>
          <h3 className="text-black text-xl">{getToday()}</h3>
          <h4 className="text-green_main text-md mt-5">Waktu</h4>
          <h3 className="text-black text-xl">{timeTaken}</h3>
          <h4 className="text-green_main text-md mt-5">Lokasi</h4>

          {/* Map Display */}
          {coordinates && (
              <iframe src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center pt-10">
          <button className={`bg-blue_main w-full max-w-[400px] text-white text-xl font-bold rounded-lg mt-2 py-1.5 ${photo ? 'opacity-100 hover:opacity-70 ' : 'opacity-40'}`} disabled={photo ? false : true}>Kirim</button>
        </div>

      </div>
    </div>

  );
};

export default FormPresensi;
