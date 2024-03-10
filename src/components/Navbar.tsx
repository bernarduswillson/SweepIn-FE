// Components
import LogoutButton from '@/components/ui/LogoutButton';
import ToggleButton from '@/components/ui/NavButton';

interface NavbarProps {
  active: 'Presensi' | 'Laporan'
};

const Navbar = (props: NavbarProps): JSX.Element => {
  const { active } = props;

  return (
    <div className='w-full flex justify-between items-center mt-5'>
      <ToggleButton state={active} />
      <LogoutButton />
    </div>
  );
};

export default Navbar;