'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubmit } from '@/hooks/useSubmit'
import { useSession } from 'next-auth/react'

// Components
import FormHeader from '@/components/navigation/FormHeader'
import ReportGalleryInput from '@/components/inputs/ReportGalleryInput'
import SubmitButton from '@/components/ui/SubmitButton'

// Utils
import { getTodayDate, date2String } from '@/utils/date'

// Interface
import Report from '@/interface/FetchedReport'
import User from '@/interface/User'
import TextAttribute from '@/components/inputs/TextAttribute'
import TextAreaAttribute from '@/components/inputs/TextAreaAttribute'

const FormLaporan = (): JSX.Element => {
  const { data: session } = useSession()

  // User data
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session])

  const route = useRouter()
  const { submit } = useSubmit()

  // Are inputs valid
  const [isInputValid, setIsInputValid] = useState<boolean>(false)

  // Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)

  // List of photos
  const [photos, setPhotos] = useState<File[]>([])

  // Description data
  const [desc, setDesc] = useState<string>('')

  // Form data
  const [formData, setFormData] = useState<Report>({
    userId: '',
    date: '',
    status: '',
    description: '',
    images: []
  })

  // Handle description change
  const handleInputChange = (
    name: string,
    value: File | string | Date | number | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
    handleInputChange('description', e.target.value)
  }

  // Check is inputs are valid
  useEffect(() => {
    if (photos.length > 0) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
    }
  }, [photos.length])

  // handle submit
  const handleSubmit = () => {
    setIsSubmitLoading(true)
    let formDataData = new FormData()
    if (user?.id) {
      formDataData.append('user_id', user?.id)
      formDataData.append('description', formData.description)
      photos.forEach((photo) => {
        formDataData.append('images', photo)
      })

      submit('/report', formDataData)
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/laporan`)
    }

    setIsSubmitLoading(false)
  }

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
      {/* Head */}
      <div className="w-11/12 max-w-[641px] py-5 flex flex-col items-center">
        <FormHeader
          title='Laporan Kerja'
          backDestination='/laporan'
        />
        <ReportGalleryInput photos={photos} setPhotos={setPhotos} />
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
        <div className="w-11/12 h-fit flex flex-col gap-3">
          <TextAttribute 
            label='Nama'
            text={user?.name}
          />
          <TextAttribute 
            label='Tanggal'
            text={date2String(getTodayDate(), false)}
          />
          <TextAreaAttribute 
            label='Deskripsi'
            value={desc}
            placeholder='Contoh: Menjaga gerbang kampus'
            onChange={handleTextChange}
          />

          {/* Submit button */}
          <div className="flex flex-col items-center pt-10">
            <SubmitButton
              text="Kirim"
              onClick={handleSubmit}
              loading={isSubmitLoading}
              disable={!isInputValid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLaporan
