'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

// Asset
import Arrow from '@public/icons/right-arrow-ic';

// Component
import SidebarButton from './ui/SidebarButton';
import Modal from '@/components/ui/Modal';

interface SidebarProps {
  active: string
}



const Sidebar = (props: SidebarProps) => {
  const { active } = props;

  // Sidebar state
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  // Logout
  const handleLogout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk'})
  };

  return (
    <div className={`absolute top-0 left-0 bottom-0 ${isOpen ? 'w-[240px]' : 'w-[30px]'} h-full p-3 bg-blue_main transition-width duration-200 ease-in-out shadow-lg shadow-black/60`}>
      
      <Modal 
        title="Anda akan keluar"
        msg="Anda akan keluar dari aplikasi ini. Apakah Anda yakin?"
        type='danger'
        confirmText='Keluar'
        onConfirm={handleLogout} 
        cancelText='Batal'
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />

      {/* Toggle Button */}
      <div 
          className={`absolute top-7 -right-[20px] w-[40px] h-[40px] flex justify-center items-center rounded-full bg-blue_main cursor-pointer ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform duration-200 ease-in-out ${ isOpen ? 'hover:rotate-180' : 'hover:rotate-0'}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
        <Arrow fillColor='#FCFCFC' />
      </div>

      <div className={`w-full overflow-hidden transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Title */}
        <div className='p-2'>
          <h1 className="text-[2rem] poppins-bold text-start text-white font-extrabold">
            SweepIn
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className='flex flex-col mt-12 gap-2'>
          <SidebarButton text='Dashboard' url='/admin' active={active === 'dashboard' ? true : false}/>
          <SidebarButton text='User' url='/admin/user' active={active === 'user' ? true : false}/>
          <SidebarButton text='Presensi' url='/admin/presensi' active={active === 'attendance' ? true : false}/>
          <SidebarButton text='Laporan' url='/admin/laporan' active={active === 'report' ? true : false}/>
          {/* Logout button */}
          <div onClick={() => setIsModalOpen(true)} className='p-2 rounded-md text-red_main cursor-pointer transition-colors duration-150 ease-in-out hover:text-white hover:bg-red_main'>
            <span className='poppins-medium'>Keluar</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;