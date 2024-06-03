'use client'

// Hooks
// import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import useToast from '@/components/hooks/useToast'

// Components
import Header from '@/components/AdminHeader'
import Sidebar from '@/components/Sidebar'
import ReportDetails from '@/components/ReportDetails'

// Interface
import User from '@/interface/User'
import Report from '@/interface/FetchedReport'

const DetailLaporan = (): JSX.Element => {
  const { data: session } = useSession();
  const { showToast } = useToast();

  // Get attendance id
  const { id } = useParams()

  // User data
  const [user, setUser] = useState<User | null>(null)

  // Loading state
  const [loading, setLoading] = useState<boolean>(true)
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)

  // Fetch data
  const [reportData, setReportData] = useState<Report>()

  // Status value
  const [formData, setFormData] = useState<any>({
    reportId: '',
    status: ''
  })

  // Set form data
  useEffect(() => {
    if (reportData) {
      setFormData({
        reportId: reportData.id,
        status: reportData.status
      })
    }
  }, [reportData])

  // Set user data from session
  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session])

  // Fetch report data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `/report/${id}`
        )
        setReportData(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  // Handle status change
  const handleStatusChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      status: value
    }))
  }

  // Handle submit
  useEffect(() => {
    const handleSubmit = async () => {
      // Set loading
      setIsSubmitLoading(true)
  
      // Edit
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/report/status`,
          formData
        )
        showToast({message: "Laporan berhasil diubah", type:"info", access: 'admin'});
      } catch (error) {
        showToast({message: "Laporan gagal diubah", type:"error", access: 'admin'});
      }
  
      setIsSubmitLoading(false)
    }

    handleSubmit()
  }, [formData])

  return (
    <div className="flex flex-row-reverse w-screen h-screen">
      <div className="w-full flex flex-col items-center bg-white">
        {/* Header */}
        <div className="w-11/12">
          <Header title="Detail Laporan" />
        </div>

        {/* Body */}
        <div className="w-11/12">
          <ReportDetails data={reportData as Report} loading={loading} onChange={handleStatusChange} />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar active="user" />
    </div>
  )
}

export default DetailLaporan
