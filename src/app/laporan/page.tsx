"use client"

// Hooks
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ReportListContainer from '@/components/ReportListContainer';

// Interfaces
import Report from '@/interface/Report';

const Laporan = (): JSX.Element => {
  const { data: session } = useSession();

  // Fetch data
  const { data, loading } = useFetch(`/report?user_id=${session?.user?.id}&page=1&per_page=10`);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">
      
      {/* Header */}
      <div className='w-11/12 max-w-[641px]'>
        <Navbar active='Laporan' />
        <Header title='Laporan' />
      </div>

      {/* Body */}
      <ReportListContainer data={data.data as Report[]} loading={loading}/>
    
    </div>
  );
};
  
export default Laporan;