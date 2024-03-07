import Image from 'next/image';
import { signOut } from 'next-auth/react';

// Asset
import Logout from '@/images/Presensi/Logout.svg'

const LogoutButton = ():JSX.Element => {

  // Logout
  const handleLogout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk'})
  }

  return (
    <button className='flex items-center group' onClick={handleLogout}>
      <Image src={Logout} alt='Logout' className='transition-all duration-200 ease-in-out group-hover:-translate-x-2'/>
      <div className='ml-2 font-semibold text-white'>Keluar</div>
    </button>
  );
};

export default LogoutButton;