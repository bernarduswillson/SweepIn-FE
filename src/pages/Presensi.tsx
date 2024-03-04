"use client"

import { useState } from 'react';
import SearchBar from '@/components/ui/searcbar';
import Card from '@/components/ui/card';
import AlertLog from '@/components/ui/alertLog';


const Presensi = (): JSX.Element => {
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

  const [showAlert, setShowAlert] = useState(false);
  const handleJoinClick = (): void => {
    setShowAlert(true)
  }
  const handleConfirm = (): void => {
    setShowAlert(false)
  }



  return (
    <div className="relative h-screen flex flex-col items-center gap-5 w-full bg-gradient-to-br from-teal-500 to-blue-600">
      <div className="flex flex-col items-center pt-10">
        <h2 className="text-white text-md font-semibold">{getToday()}</h2>
        <h1 className="text-white text-3xl font-extrabold">Laporan Kerja</h1>
      </div>
      <div className="w-[85vw] pt-10">
        <h2 className="text-white text-md font-extrabold">Foto Laporan (Maksimal 4)</h2>
        <div className="flex flex-row justify-center gap-[15px]">
        </div>
      </div>
    <div className="h-[70vh] px-[5vw] w-full bg-white bottom-0 relative rounded-tl-[40px] rounded-tr-[40px] flex flex-col py-10 px-5">
     <div className='h-fit'>
      <h1 className="text-blue_main text-xl font-bold">Nama</h1>
      <h2 className="text-black text-xl">Bernardus Willson</h2>
      <h3 className="text-blue_main text-xl font-bold mt-5">Tanggal</h3>
      <h4 className="text-black text-xl">{getToday()}</h4>
      <h5 className="text-blue_main text-xl font-bold mt-5">Deskripsi</h5>
      <h6 className="text-black text-xl">{getToday()}</h6>
      <div className="flex flex-col">
        <textarea className='h-auto resize-none border-none rounded-lg p-2 w-full h-24 mt-1 outline-none bg-[#EDF1F6]'></textarea>
        <button className="bg-blue_main text-white text-xl font-bold rounded-lg mt-2 h-10">Kirim</button>
      </div>
    


      <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
        <div className='w-full h-fit gap-1'>
        </div>
      </div>
    </div>
    </div>
      {showAlert && <AlertLog onConfirm={handleConfirm} onCancel={handleConfirm} />}
    </div>
  );
};
  
export default Presensi;