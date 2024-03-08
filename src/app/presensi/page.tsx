"use client"

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ListContainer from '@/components/ListContainer';

const Presensi = (): JSX.Element => {

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">

        {/* Header */}
        <div className='w-11/12 max-w-[641px]'>
          <Navbar />
          <Header title='Presensi' />
        </div>

        {/* Body */}
        <ListContainer title='Daftar Presensi' />

    </div>
  );
};
  
export default Presensi;