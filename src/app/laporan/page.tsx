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
import Report from '@/interface/Report';
import User from '@/interface/User';

const Laporan = (): JSX.Element => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  // Fetch data
  // const { data, loading } = useFetch(`/report?user_id=${session?.user?.id}&page=1&per_page=10`);
  const [data, setData] = useState({ data: [], loading: true } as { data: Report[], loading: boolean });
  const { loading } = data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id;
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report?user_id=${userId}&page=1&per_page=10`);
        setData({ data: response.data.data, loading: false });
      } catch (error) {
        console.error(error);
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
      <ReportListContainer data={data.data as Report[]} loading={loading}/>
    
    </div>
  );
};
  
export default Laporan;