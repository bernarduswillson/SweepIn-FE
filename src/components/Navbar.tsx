// Components
import LogoutButton from '@components/ui/LogoutButton';
import ToggleButton from '@components/ui/NavButton';

const Navbar = (): JSX.Element => {
  return (
    <div className='w-full flex justify-between items-center mt-5'>
      <ToggleButton state={'Presensi'} />

      <LogoutButton />
    </div>
  );
}

export default Navbar;