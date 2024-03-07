"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

// Assets
import WaveTop from "@public/images/wave-top-illustration.svg"
import WaveBot from "@public/images/wave-bottom-illustration.svg"
import ITB from "@public/icons/itb-ic.svg"

// Components
import GoogleButton from "@/components/ui/GoogleButton";
import AlertLogin from "@/components/ui/Modal";

const Masuk = (): JSX.Element => {
  const router = useRouter();

  // Show modal alert if access in unauthorized
  const [showAlert, setShowAlert] = useState(false);
  const searchParams = useSearchParams()
  const search = searchParams?.get('error')

  // Handle unauthorized login
  useEffect(() => {
    if (search === "AccessDenied") {
      setShowAlert(true)
    }
  }, [search, router])

  // Handle modal confirm
  const handleConfirm = (): void => {
    setShowAlert(false)
  }

  return (
    <div className="relative h-screen bg-white font-bold flex flex-col justify-center overflow-hidden">
      {/* Top Illustration */}
      <div className="absolute w-screen top-0 sm:translate-y-[-25vw]">
        <Image src={WaveTop} alt="WaveTop" className="w-full" />
      </div>

      {/* Body */}
      <div className="flex flex-col items-center z-[10]">

        {/* Title */}
        <div>
          <h1 className="text-[50px] poppins-bold text-center text-blue_main font-extrabold">
            Sweep
            <span className="outline-title text-white">
              In
            </span>
          </h1>
          <p className="text-center text-md poppins-medium text-text_grey">Masuk untuk melanjutkan</p>
        </div>

        {/* Google Login Button */}
        <div className="w-4/5 max-w-[370px]">
          <GoogleButton />
        </div>

        {/* Alert Box */}
        {showAlert && <AlertLogin onConfirm={handleConfirm} />}
      </div>

      {/* Bottom Illustration */}
      <div className="absolute w-[25vw] mb-[20px] left-0 bottom-0">
        <Image src={ITB} alt="ITB" className="mx-auto" />
      </div>
      <div className="absolute w-[70vw] bottom-0 right-0 flex justify-end sm:translate-y-[15vw]">
        <Image src={WaveBot} alt="WaveBot" className="w-full" />
      </div>
    </div>
  );
};

export default Masuk;