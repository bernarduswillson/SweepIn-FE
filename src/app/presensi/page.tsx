"use client"

import { useState } from 'react';
import Image from 'next/image';

// Components
import Navbar from '@components/Navbar';
import Header from '@components/Header';
import ListContainer from '@/components/ListContainer';
import AlertLog from '@/components/ui/alertLog';

// Data
import AttendanceData from "@data/attendanceDummy.json"

const Presensi = (): JSX.Element => {

  const [showAlert, setShowAlert] = useState(false);
  const handleJoinClick = (): void => {
    setShowAlert(true)
  }
  const handleConfirm = (): void => {
    setShowAlert(false)
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-blue_main overflow-hidden">

        {/* Header */}
        <div className='relative w-11/12 max-w-[641px] h-[40vh]'>
          <Navbar />
          <Header title='Presensi' />
        </div>

        {/* Body */}
        <ListContainer title='Daftar presensi' />

      {/* {showAlert && <AlertLog onConfirm={handleConfirm} onCancel={handleConfirm} />} */}
    
    </div>
  );
};
  
export default Presensi;