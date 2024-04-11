"use client"

// Imports
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSubmit } from '@/hooks/useSubmit';
import { useParams } from 'next/navigation';

// Components
import Dropdown from "@/components/ui/customDropdown";
import SubmitButton from "@/components/ui/SubmitButton";

// Interface
import User from "@/interface/User";

// Props
interface UserFormProps {
  data: User
}

const UserForm = (props: UserFormProps): JSX.Element => {
	const route = useRouter();
  const { submit } = useSubmit();

  // Get attendance id
  const { id } = useParams();

	// Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

	// Are inputs valid
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

	// Form data
	const [formData, setFormData] = useState<User>({
		id: '',
		name: '',
		email: '',
		location: '',
		role: '',
	});

  // Set form data
  useEffect(() => {
    if (props.data) {
      setFormData(props.data);
    }
  }, [props.data]);
	
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
		submit('/edit', formData);
		route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`);
		
		setIsSubmitLoading(false);
	}

  // Handle delete
  const handleDelete = () => {
		// Set loading
		setIsDeleteLoading(true);

		// Delete
		submit('/delete', id);
		route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`);
		
		setIsDeleteLoading(false);
	}

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-x-5 mb-5">			
        {/* Name */}
        <div className="poppins-regular mb-5">
          <h2 className="poppins-bold text-blue_main">Nama</h2>
          <input 
            type="text"
            placeholder="Ketik nama disini"
            className="w-full border-2 border-gray-300 rounded-md p-2"
            value={formData.name}
            onChange={(e) => handleValueChange('name', e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="poppins-regular mb-5">
          <h2 className="poppins-bold text-blue_main">Email</h2>
          <input
            type="email"
            placeholder="Ketik email disini"
            className="w-full border-2 border-gray-300 rounded-md p-2"
            value={formData.email}
            onChange={(e) => handleValueChange('email', e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="poppins-regular mb-10">
          <h2 className="poppins-bold text-blue_main">Role</h2>
          <Dropdown 
            label="Role"
            placeholder='Pilih Role'
            onChange={(value) => handleValueChange('role', value)}
            value={formData.role}
            options={[
              'ADMIN',
              'CLEANER',
              'SECURITY',
            ]}
          />
        </div>

        {/* Location */}
        <div className="poppins-regular mb-5">
          <h2 className="poppins-bold text-blue_main">Lokasi</h2>
          <Dropdown
            label="Lokasi"
            placeholder='Pilih Lokasi'
            onChange={(value) => handleValueChange('location', value)}
            value={formData.location}
            options={[
              'GANESHA',
              'JATINANGOR',
              'CIREBON',
              'BOSSCHA',
            ]}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-[400px] flex gap-5">
          {/* Submit button */}
          {/* TODO: Change text and bg color */}
          <SubmitButton text='Tambah User' onClick={handleSubmit} loading={isSubmitLoading} disable={!isInputValid}/>
        
          {/* Delete button */}
          {/* TODO: Change text and bg color */}
          <SubmitButton text='Tambah User' onClick={handleDelete} loading={isDeleteLoading}/>
        </div>
      </div>

    </div>
  );
};

export default UserForm;