'use client';

import React, { useState, useEffect } from 'react';
import { useSubmit } from '@/hooks/useSubmit';
import { useSession } from 'next-auth/react';

// Asset
import MapMissing from '@public/images/map-missing.svg';
import { useRouter } from 'next/navigation';

// Components
import FormHeader from '@/components/navigation/FormHeader';
import AttendancePhotoInput from '@/components/ui/AttendancePhotoInput';
import SubmitButton from '@/components/ui/SubmitButton';
import TextAttribute from '@/components/inputs/TextAttribute';
import MapAttribute from '@/components/inputs/MapAttribute';
import ConfirmModal from '@/components/dialouge/ConfirmModal';

// Interface
import LogForm from '@/interface/LogForm';
import User from '@/interface/User';

// Utils
import { getTodayDate, date2String, dateTime2String } from '@/utils/date';

const FormPresensiAwal = () => {
  // Session
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session]);

  const route = useRouter();
  const { submit } = useSubmit();

  // Loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  // Location not found state
  const [isLocationError, setIsLocationError] = useState<boolean>(false);

  // Form data
  const [formData, setFormData] = useState<LogForm>({
    date: '',
    image: undefined,
    imageSrc: undefined,
    latitude: 0,
    longitude: 0
  });

  // Handle input change
  const handleInputChange = (
    name: string,
    value: File | string | Date | number | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Get Location
  const defaultSettings = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const getLoc = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }))
      },
      () => {
        setIsLocationError(true);
      },
      defaultSettings
    );
  };

  // Update time and location when photo is updated
  useEffect(() => {
    if (formData.image) {
      setFormData((prev) => ({
        ...prev,
        date: new Date().toISOString()
      }))
      getLoc()
    }
  }, [formData.image]);

  // Handle submit
  const handleSubmit = () => {
    setIsSubmitLoading(true)
    let formDataData = new FormData()
    if (user) {
      console.log(user.id)
      formDataData.append('userId', user.id as string)
      formDataData.append('date', formData.date)
      formDataData.append('latitude', formData.latitude.toString())
      formDataData.append('longitude', formData.longitude.toString())
      if (formData.image) {
        formDataData.append('file', formData.image)
      }
      submit('/log/start', formDataData)
      route.push(`${process.env.NEXT_PUBLIC_BASE_URL}/presensi`)
    }

    setIsSubmitLoading(false);
  }

  return (
    <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
      {/* Head */}
      <div className="w-11/12 max-w-[641px] py-5 flex flex-col items-center">
        <FormHeader 
          title='Presensi Awal' 
          backDestination='/presensi'
        />
        <AttendancePhotoInput
          image={formData.image}
          setImage={handleInputChange}
          imageSrc={formData.imageSrc}
          setImageSrc={handleInputChange}
        />
      </div>

      {/* Body */}
      <div className="w-full max-w-[641px] py-6 bg-white rounded-t-[26px] flex justify-center flex-grow">
        <div className="w-11/12 h-fit flex flex-col gap-3">
          {/* Text input */}
          <TextAttribute 
            label='Nama'
            text={session?.user?.name}
          />
          <TextAttribute 
            label='Tanggal'
            text={date2String(getTodayDate(), false)}
          />
          <TextAttribute 
            label='Waktu'
            text={formData.date ? dateTime2String(new Date(formData.date)) : ':-:'}
          />
          <MapAttribute 
            label='Lokasi'
            longitude={formData.longitude}
            latitude={formData.latitude}
          />

          {/* Submit button */}
          <div className="flex flex-col items-center pt-10">
            <SubmitButton
              text="Kirim"
              onClick={handleSubmit}
              loading={isSubmitLoading}
              disable={
                !formData.image ||
                !formData.date ||
                !formData.longitude ||
                !formData.latitude
              }
            />
          </div>
        </div>
      </div>

      <ConfirmModal 
        title='Lokasi tidak ditemukan'
        img={MapMissing}
        msg="Patikan lokasi pada HP Anda sudah aktif untuk melakukan presensi"
        confirmText='Oke'
        onConfirm={() => setIsLocationError(false)}
        onClose={() => setIsLocationError(false)}
        isOpen={isLocationError}
      />
    </div>
  )
}

export default FormPresensiAwal;
