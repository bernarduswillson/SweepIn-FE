"use client"

// Hooks
import { useFetch } from '@/hooks/useFetch';

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ListContainer from '@/components/ListContainer';

// TEST: Data
import attendanceDummy from '@/data/attendanceDummy.json';
import Attendance from '@/interface/Attendance';

const Presensi = (): JSX.Element => {
  // Fetch data
  // TODO: Get the user id from session
  // const { data, loading } = useFetch(`/api/activity/user/65e977f9ff15a6ab52da402a`);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">

        {/* Header */}
        <div className='w-11/12 max-w-[641px]'>
          <Navbar active='Presensi'/>
          <Header title='Presensi' />
        </div>

        {/* Body */}
        <ListContainer title='Daftar Presensi' data={attendanceDummy as Attendance[]} loading={false}/>

    </div>
  );
};
  
export default Presensi;