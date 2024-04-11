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
import ListContainer from '@/components/UserListContainer';
import Sidebar from '@/components/Sidebar';
import UserEditForm from '@/components/UserEditForm';

// Interface
import User from '@/interface/User';

const DetailUser = (): JSX.Element => {
  const { data: session } = useSession();

  // Get attendance id
  const { id } = useParams();

  // User data
  const [user, setUser] = useState<User | null>(null);

  // Fetch data
  const [userData, setUserData] = useState<User[]>([]);

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

	// dummy data
	useEffect(() => {
		setUserData([{
			id: '1',
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			location: 'GANESHA',
			role: 'ADMIN',
		}]);
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
		  	</div>

      </div>

      {/* Sidebar */}
      <Sidebar active='user'/>
    </div>
  );
};
  
export default DetailUser;