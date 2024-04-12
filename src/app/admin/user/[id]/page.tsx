"use client"

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

// Components
import Header from '@/components/AdminHeader';
import AttendaceListContainer from '@/components/AdminAttendanceListContainer';
import ReportListContainer from '@/components/AdminReportListContainer';
import Sidebar from '@/components/Sidebar';
import UserEditForm from '@/components/UserEditForm';
import ToggleButton from '@/components/AdminToggleButton';

// Interface
import User from '@/interface/User';
import Attendance from '@/interface/FetchedAttendance';
import Report from '@/interface/FetchedReport';
import { set } from 'date-fns';

const DetailUser = (): JSX.Element => {
  const { data: session } = useSession();

  // Get attendance id
  const { id } = useParams();

	// Query params
  const searchParams = useSearchParams();

  // Date search
  const startDate = searchParams.get('start_date') || '';
  const endDate = searchParams.get('end_date') || '';

  // User data
  const [user, setUser] = useState<User | null>(null);

	// Loading state
	const [loading, setLoading] = useState<boolean>(true);

	// Container state
	const [container, setContainer] = useState<'Presensi' | 'Laporan'>('Presensi');

  // Fetch data
  const [userData, setUserData] = useState<User[]>([]);
	const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
	const [reportData, setReportData] = useState<Report[]>([]);

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

	// Fetch user data
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			if (id) {
	// 				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
	// 				setUserData(response.data.data);
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// 	fetchData();
	// }, [id]);

	// Fetch attendance data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       if (user?.id) {
  //         const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/attendance?user_id=${user?.id}&page=1&per_page=10&start_date=${startDate}&end_date=${endDate}`);
  //         setAttendanceData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [user?.id, startDate, endDate]);

	// Fetch report data
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			if (user?.id) {
	// 				const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/report?user_id=${user?.id}&page=1&per_page=10&start_date=${startDate}&end_date=${endDate}`);
	// 				setReportData(response.data.data);
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchData();
	// }, [user?.id, startDate, endDate]);

	// dummy data
	useEffect(() => {
		setUserData([{
			id: '1',
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			location: 'GANESHA',
			role: 'ADMIN',
		}]);
		setAttendanceData([
			{
				id: '1',
				date: '2022-01-01',
				userId: '1',
				user: {
					id: '1',
					name: 'John Doe'
				},
				startLog: [{
					id: '1',
					date: '2022-01-01',
					image: 'https://via.placeholder.com/150',
					latitude: -6.1234,
					longitude: 106.1234,
					attendanceStartId: null,
					attendanceEndId: '1'
				}],
				endLog: [{
					id: '2',
					date: '2022-01-01',
					image: 'https://via.placeholder.com/150',
					latitude: -6.1234,
					longitude: 106.1234,
					attendanceStartId: '1',
					attendanceEndId: null
				}]
			}
		]);
		setReportData([
			{
				userId: '1',
				date: '2022-01-01',
				status: 'ACCEPTED',
				description: 'Lorem ipsum dolor sit amet',
				images: ['https://via.placeholder.com/150']
			}
		]);
		setLoading(false);
	}, []);
  
  return (
    <div className='flex flex-row-reverse w-screen h-screen'>
      <div className="w-full flex flex-col items-center bg-white">

				{/* Header */}
				<div className='w-11/12'>
					<Header title='Detail User' />
				</div>

				{/* Body */}
		  	<div className='w-11/12'>
					<h2 className='poppins-extrabold text-lg mb-5'>Profil</h2>
					<UserEditForm data={userData[0]} />

					<h2 className='poppins-extrabold text-lg mb-5 mt-10'>Aktivitas</h2>
					<ToggleButton active={container} setActive={setContainer} />
					{ container === 'Presensi' ? (
						<AttendaceListContainer data={attendanceData as Attendance[]} loading={loading}/>
					) : (
						<ReportListContainer data={reportData as Report[]} loading={loading}/>
					)}
		  	</div>

      </div>

      {/* Sidebar */}
      <Sidebar active='user'/>
    </div>
  );
};
  
export default DetailUser;