import Link from "next/link";
import AddButton from "./AddButton";
import BottomNavbarItem from "./BottomNavbarItem";

interface BottomNavbarProps {
  active: 'presensi' | 'laporan'
};

function BottomNavbar(props: BottomNavbarProps) {
  const { active } = props;

  return (
    <div className="fixed z-40 bottom-0 inset-x-0 w-full py-3 bg-primary-500">
      <div className="w-full max-w-[640px] mx-auto">
        <div className="w-11/12 mx-auto flex justify-around gap-28">
          
          <Link href="/presensi">
            <BottomNavbarItem 
              text="Presensi"
              active={active === 'presensi'}
            />
          </Link>
        
          <div className="absolute bottom-6 left-[50%] translate-x-[-50%] flex justify-center">
            <AddButton />
          </div>
        
          <Link href="/laporan">
            <BottomNavbarItem 
              text="Laporan"
              active={active === 'laporan'}
            />
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;