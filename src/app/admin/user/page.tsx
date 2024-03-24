"use client"

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

// Components
import Header from '@/components/AdminHeader';
import ListContainer from '@/components/UserListContainer';
import Sidebar from '@/components/Sidebar';

// Interface
import User from '@/interface/User';

const User = (): JSX.Element => {
  const { data: session } = useSession();

  // Query params
  const searchParams = useSearchParams();

  // Pagination
  const [count, setCount] = useState<number[]>([]);
  const itemsPerPage = 10;
  const page = Number(searchParams.get('page')) || 1;

  // Name search
  const name = searchParams.get('name') || '';

  // Location search
  const location = searchParams.get('location') || '';

  // Role search
  const role = searchParams.get('role') || '';

  // User data
  const [user, setUser] = useState<User | null>(null);

  // Fetch data
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}&per_page=${itemsPerPage}&name=${name}${location && location != 'Semua Lokasi' ? `&location=${location}` : ''}${role && role != 'Semua Role' ? `&role=${role}` : ''}`);
          setData(response.data.data);
          setCount([response.data.count, itemsPerPage]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location, name, page, role, user?.id]);
  
  return (
    <div className='flex w-screen min-h-screen'>
      {/* Sidebar */}
      <Sidebar active='user'/>

      <div className="w-full flex flex-col items-center bg-white">

          {/* Header */}
          <div className='w-11/12'>
            <Header title='Daftar User' />
          </div>

          {/* Body */}
          <ListContainer data={data as User[]} count={count} loading={loading}/>

      </div>
    </div>
  );
};
  
export default User;