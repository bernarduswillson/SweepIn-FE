"use client"

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ListContainer from '@/components/ListContainer';

// Interfaces
import Report from '@/interface/Report';

// TEST: Data
import reportData from '@/data/reportDummy.json';

const Laporan = (): JSX.Element => {
  // Fetch data
  // TODO: Get the user id from session
  // const { data, loading } = useFetch(`/api/activity/user/65e977f9ff15a6ab52da402a`);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">
      
      {/* Header */}
      <div className='w-11/12 max-w-[641px]'>
        <Navbar active='Laporan' />
        <Header title='Laporan' />
      </div>

      {/* Body */}
      <ListContainer title='Daftar Laporan' data={reportData as Report[]} loading={false}/>
    
    </div>
  );
};
  
export default Laporan;