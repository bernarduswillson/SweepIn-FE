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
    <div className={`absolute top-0 left-0 bottom-0 ${isOpen ? 'w-[240px]' : 'w-[30px]'} h-full p-3 border-r-4 border-grey_bg transition-width duration-200 ease-in-out`}>
      
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
          className={`absolute top-7 -right-[16px] w-[32px] h-[32px] flex justify-center items-center rounded-full bg-grey_bg cursor-pointer ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform duration-200 ease-in-out ${ isOpen ? 'hover:rotate-180' : 'hover:rotate-0'}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
        <Arrow fillColor='#005AAB' />
      </div>

      <div className={`w-full overflow-hidden transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Title */}
        <div className='p-2'>
          <h1 className="text-[2rem] poppins-bold text-start text-blue_main font-extrabold">
            Sweep
            <span className="outline-title text-white">
              In
            </span>
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className='flex flex-col mt-12 gap-2'>
          <SidebarButton text='Dashboard' url='/admin' active={active === 'dashboard' ? true : false}/>
          <SidebarButton text='Presensi' url='/admin/presensi' active={active === 'attendance' ? true : false}/>
          <SidebarButton text='Laporan' url='/admin/laporan' active={active === 'report' ? true : false}/>
          <SidebarButton text='User' url='/admin/user' active={active === 'user' ? true : false}/>
          {/* Logout button */}
          <div onClick={() => setIsModalOpen(true)} className='p-2 rounded-md cursor-pointer transition-colors duration-150 ease-in-out hover:bg-grey_bg'>
            <span className='text-red_main poppins-medium'>Keluar</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;