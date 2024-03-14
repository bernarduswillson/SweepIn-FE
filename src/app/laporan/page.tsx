"use client"

// Hooks
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report?user_id=${userId}&page=1&per_page=10`);
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  } , [user]);

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