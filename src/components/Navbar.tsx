import Image from 'next/image';

// Components
import ToggleButton from '@components/ui/toggle';

// Images
import Logout from '@/images/Presensi/Logout.svg'

const Navbar = (): JSX.Element => {
  return (
    <div className='w-full flex justify-between mt-5'>
      <ToggleButton state={true} />
      {/* <button className='flex items-center transition-all duration-200 ease-in-out hover:translate-x-3' onClick={() => setShowAlert(true)}> */}
      <button className='flex items-center transition-all duration-200 ease-in-out hover:translate-x-3'>
        <Image src={Logout} alt='Logout' />
        <div className='ml-2 font-semibold text-white'>Keluar</div>
      </button>
    </div>
  );
}

export default Navbar;