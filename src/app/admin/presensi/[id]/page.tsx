"use client"

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

// Components
import Header from '@/components/AdminHeader';
import Sidebar from '@/components/Sidebar';
import AttendanceDetails from '@/components/AttendanceDetails';

// Interface
import User from '@/interface/User';
import Attendance from '@/interface/FetchedAttendance';
import { set } from 'date-fns';

const DetailPresensi = (): JSX.Element => {
  const { data: session } = useSession();

  // Get attendance id
  const { id } = useParams();

  // User data
  const [user, setUser] = useState<User | null>(null);

	// Loading state
	const [loading, setLoading] = useState<boolean>(true);

  // Fetch data
  const [attendanceData, setAttendanceData] = useState<Attendance>();

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

	// Fetch attendance data
	useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/attendance/${id}`);
        setAttendanceData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);
  
  return (
    <div className='flex flex-row-reverse w-screen h-screen'>
      <div className="w-full flex flex-col items-center bg-white">

				{/* Header */}
				<div className='w-11/12'>
					<Header title='Detail Presensi' />
				</div>

				{/* Body */}
		  	<div className='w-11/12'>
          <AttendanceDetails data={attendanceData as Attendance} loading={loading} />
		  	</div>

      </div>

      {/* Sidebar */}
      <Sidebar active='user'/>
    </div>
  );
};
  
export default DetailPresensi;