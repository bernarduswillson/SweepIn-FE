"use client"

// Hooks
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ListContainer from '@/components/AttendanceListContainer';

// TEST: Data
import attendanceDummy from '@/data/attendanceDummy.json';
import Attendance from '@/interface/Attendance';

const Presensi = (): JSX.Element => {
  const { data: session } = useSession();
  console.log(session);

  // Fetch data
  const { data, loading } = useFetch(`/attendance?user_id=${session?.user?.id}&page=1&per_page=10`);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">

        {/* Header */}
        <div className='w-11/12 max-w-[641px]'>
          <Navbar active='Presensi'/>
          <Header title='Presensi' />
        </div>

        {/* Body */}
        <ListContainer data={data as Attendance[]} loading={loading}/>

    </div>
  );
};
  
export default Presensi;