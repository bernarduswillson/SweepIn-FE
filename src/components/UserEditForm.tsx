'use client'

// Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSubmit } from '@/hooks/useSubmit'
import { useParams } from 'next/navigation'
import axios from 'axios'

// Components
import Dropdown from '@/components/ui/customDropdown'
import SubmitButton from '@/components/ui/SubmitButton'
import DeleteButton from '@/components/ui/DeleteButton'

// Interface
import User from '@/interface/User'

// Props
interface UserFormProps {
  data: User
}

const UserForm = (props: UserFormProps): JSX.Element => {
  const { data } = props

  const route = useRouter()
  const { submit } = useSubmit()

  // Get attendance id
  const { id } = useParams()

  // Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  // Are inputs valid
  const [isInputValid, setIsInputValid] = useState<boolean>(false)

  // Form data
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    email: '',
    location: '',
    role: ''
  })

  // Set form data
  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  // Handle value change
  const handleValueChange = (
    name: 'name' | 'email' | 'location' | 'role',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log(formData)
    validateForm()
  }, [formData])

  // Validate form
  const validateForm = () => {
    const { name, email, location, role } = formData
    const isValid =
      name.trim() !== '' &&
      email.trim() !== '' &&
      location.trim() !== '' &&
      role.trim() !== ''
    setIsInputValid(isValid)
  }

  // Handle submit
  const handleSubmit = async () => {
    // Set loading
    setIsSubmitLoading(true)

    // Edit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        formData
      )
      console.log(response)
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`)
    } catch (error) {
      console.error('Error updating user:', error)
    }

    setIsSubmitLoading(false)
  }

  // Handle delete
  const HandleDelete = async () => {
    // Set loading
    setIsDeleteLoading(true)

    // Delete
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`
      )
      console.log(response)
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`)
    } catch (error) {
      console.error('Error deleting user:', error)
    }

    setIsDeleteLoading(false)
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
            placeholder="Ganti Role"
            onChange={(value) => handleValueChange('role', value)}
            value={formData.role}
            options={['ADMIN', 'CLEANER', 'SECURITY']}
          />
        </div>

        {/* Location */}
        <div className="poppins-regular mb-5">
          <h2 className="poppins-bold text-blue_main">Lokasi</h2>
          <Dropdown
            label="Lokasi"
            placeholder="Ganti Lokasi"
            onChange={(value) => handleValueChange('location', value)}
            value={formData.location}
            options={['GANESHA', 'JATINANGOR', 'CIREBON', 'BOSSCHA']}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-[400px] flex gap-5">
          {/* Submit button */}
          <SubmitButton
            text="Save changes"
            onClick={handleSubmit}
            loading={isSubmitLoading}
            disable={!isInputValid}
            bgColor="green"
          />

          {/* Delete button */}
          <DeleteButton
            text="Delete"
            onClick={HandleDelete}
            loading={isDeleteLoading}
            username={formData.name}
          />
        </div>
      </div>
    </div>
  )
}

export default UserForm
