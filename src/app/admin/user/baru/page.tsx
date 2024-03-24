"use client"

// Imports
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSubmit } from '@/hooks/useSubmit';

// Components
import Dropdown from "@/components/ui/customDropdown";
import SubmitButton from "@/components/ui/SubmitButton";

// Interface
import User from "@/interface/User";

const UserCreate = (): JSX.Element => {
	const route = useRouter();
  const { submit } = useSubmit();

	// Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

	// Are inputs valid
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

	// Form data
	const [formData, setFormData] = useState<User>({
		name: '',
		email: '',
		location: '',
		role: '',
	});
	
	// Handle value change
	const handleValueChange = (name: 'name' | 'email' | 'location' | 'role', value: string) => {
		setFormData((prev) => ({
			...prev,
			[name]: value
		}))
	};

	useEffect(() => {
		console.log(formData);
		validateForm();
}, [formData]);

	// Validate form
	const validateForm = () => {
			const { name, email, location, role } = formData;
			const isValid = name.trim() !== '' && email.trim() !== '' && location.trim() !== '' && role.trim() !== '';
			setIsInputValid(isValid);
	};

	// Handle submit
	const handleSubmit = () => {
		// Set loading
		setIsSubmitLoading(true);

		// Submit
		submit('/register', formData);
		route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`);
		
		setIsSubmitLoading(false);
	}

  return (
    <div className="px-[5vw] flex flex-col">
			<h1 className="poppins-extrabold text-blue_main text-5xl text-center my-10">Tambah User</h1>
			
			{/* Name */}
			<div className="poppins-regular mb-5">
				<h2 className="poppins-bold text-xl">Nama</h2>
				<input 
					type="text"
					placeholder="Ketik nama disini"
					className="w-full border-2 border-gray-300 rounded-md p-2"
					onChange={(e) => handleValueChange('name', e.target.value)}
				/>
			</div>

			{/* Email */}
			<div className="poppins-regular mb-5">
				<h2 className="poppins-bold text-xl">Email</h2>
				<input
					type="email"
					placeholder="Ketik email disini"
					className="w-full border-2 border-gray-300 rounded-md p-2"
					onChange={(e) => handleValueChange('email', e.target.value)}
				/>
			</div>

			{/* Location */}
			<div className="poppins-regular mb-5">
				<h2 className="poppins-bold text-xl">Lokasi</h2>
				<Dropdown 
					label="Lokasi"
					placeholder='Pilih Lokasi'
					onChange={(value) => handleValueChange('location', value)}
					options={[
						'GANESHA',
						'JATINANGOR',
						'CIREBON',
						'BOSSCHA',
					]}
				/>
			</div>

			{/* Role */}
			<div className="poppins-regular mb-10">
				<h2 className="poppins-bold text-xl">Role</h2>
				<Dropdown 
					label="Role"
					placeholder='Pilih Role'
					onChange={(value) => handleValueChange('role', value)}
					options={[
						'ADMIN',
						'CLEANER',
						'SECURITY',
					]}
				/>
			</div>

			{/* Submit button */}
			<SubmitButton text='Tambah User' onClick={handleSubmit} loading={isSubmitLoading} disable={!isInputValid}/>

    </div>
  );
};

export default UserCreate;