"use client"

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { set } from 'date-fns';
import Head from 'next/head';

import Position  from '@react-native-community/geolocation';

declare global {
    interface Window {
        google: any;
    }
}

const FormPresensi = () => {

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
    const [timeTaken, setTimeTaken] = useState('-');
    
    const getTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        return `${hours}.${minutes} WIB`;
    }
    
const videoRef = useRef<HTMLVideoElement>(null);

const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
};

const [photo, setPhoto] = useState<string | null>(null);
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

const capturePhoto = async () => {
    setTimeTaken(getTime());
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = async (event) => {

            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const imageSrc = URL.createObjectURL(file);
                setPhoto(imageSrc);
                getLoc();
            }
    };

    input.click();
};




  return (
    <div className="relative h-auto flex flex-col items-center gap-5 w-auto bg-gradient-to-br from-teal-500 to-blue-600">
    <Head>
      <script src="https://maps.googleapis.com/maps/api/js?key=65ddc9d88e582231871377lzvec47f9&libraries=places" defer></script>
    </Head>
      <div className="flex flex-col items-center pt-10">
        <h2 className="text-white text-md font-semibold">{getToday()}</h2>
        <h1 className="text-white text-3xl font-extrabold">Presensi Awal</h1>
      </div>
      <div className="relative border-[5px] border-white rounded-xl w-[237px] h-[237px]">
        {photo ? (<Image src={photo} alt="photo" layout="fill" objectFit="cover" />) : (
          <button onClick={capturePhoto} className="w-full h-full bg-white text-black font-bold text-lg rounded-xl">Ambil Foto</button>
        )}
      </div>
      <div className="flex justify-center items-center gap-5">
        {photo && (
          <button onClick={capturePhoto} className="bg-white text-blue_main font-bold text-lg px-5 py-2 rounded-lg">Ambil Ulang</button>
        )}
        </div>
      <div className="h-[70vh] max-w-[800px] w-full bg-white bottom-0 relative rounded-tl-[40px] rounded-tr-[40px] flex flex-col py-10 px-[5vw]">
        <div className='h-fit'>
          <h3 className="text-green_main text-xl font-bold">Nama</h3>
          <h3 className="text-black text-xl">Bernardus Willson</h3>
          <h3 className="text-green_main text-xl font-bold mt-5">Tanggal</h3>
          <h3 className="text-black text-xl">{getToday()}</h3>
          <h3 className="text-green_main text-xl font-bold mt-5">Waktu</h3>
          <h3 className="text-black text-xl">{timeTaken}</h3>
          <h3 className="text-green_main text-xl font-bold mt-5">Lokasi</h3>
          <p>
          Latitude: {coordinates?.lat}, Longitude: {coordinates?.lng}
          </p>
            {coordinates && (
                <iframe src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`} width="100%" height="200" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
            )}
            <div className="flex flex-col items-center pt-10">
              <button className="bg-blue_main sm:w-[75%] w-full max-w-[400px] text-white text-xl font-bold rounded-lg mt-2 h-[40px]">Kirim</button>
            </div>
        </div>
      </div>
    </div>

  );
};

export default FormPresensi;
