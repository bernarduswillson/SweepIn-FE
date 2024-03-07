import { useState } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

// Asset
import Logout from '@/images/Presensi/Logout.svg';

// Components
import Modal from '@/components/ui/Modal';

const LogoutButton = ():JSX.Element => {
  
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  // Logout
  const handleLogout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk'})
  };

  // Open confirmation modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  // Close confirmation modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      {
        isModalOpen && 
        <Modal 
          title="Anda akan keluar"
          msg="Anda akan keluar dari aplikasi ini. Apakah Anda yakin?"
          type='danger'
          confirmText='Keluar'
          onConfirm={handleLogout} 
          cancelText='Batal'
          onClose={handleCloseModal}
        />
      }
      <button className='flex items-center group' onClick={handleOpenModal}>
        <Image src={Logout} alt='Logout' className='transition-all duration-200 ease-in-out group-hover:-translate-x-2'/>
        <div className='ml-2 font-semibold text-white'>Keluar</div>
      </button>
    </div>
  );
};

export default LogoutButton;