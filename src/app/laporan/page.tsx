"use client"

// Hooks
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ReportListContainer from '@/components/ReportListContainer';

// Interfaces
import User from '@/interface/User';
import FetchedReport from '@/interface/FetchedReport';

const Laporan = (): JSX.Element => {
  const { data: session } = useSession();

  // Query params
  const searchParams = useSearchParams();

  // Date search
  const startDate = searchParams.get('start_date') || '';
  const endDate = searchParams.get('end_date') || '';

  // User data
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  // Fetch data
  const [data, setData] = useState<FetchedReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = user?.id;
        if (userId) {
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report?user_id=${userId}&page=1&per_page=10&start_date=${startDate}&end_date=${endDate}`);
          setData(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  } , [user?.id, startDate, endDate]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">
      
      {/* Header */}
      <div className='w-11/12 max-w-[641px]'>
        <Navbar active='Laporan' />
        <Header title='Laporan' />
      </div>

      {/* Body */}
      <ReportListContainer data={data as FetchedReport[]} loading={loading}/>
    
    </div>
  );
};
  
export default Laporan;