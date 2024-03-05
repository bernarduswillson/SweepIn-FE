"use client"

// Imports
import Image from "next/image";
import Lottie from "react-lottie";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

// Assets
import WaveTop from "@public/images/wave-top-illustration.svg"
import WaveBot from "@public/images/wave-bottom-illustration.svg"
import ITB from "@public/icons/itb-ic.svg"
import Google from "@public/icons/google-ic.svg"
import AlertLogin from "@/components/ui/Modal";
import googleLoadingAnimation from "@public/lotties/google-loading.json";

const Login = (): JSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
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

  const handleConfirm = (): void => {
    setShowAlert(false)
  }
  
  // Handle login
  const handleLogin = async () => {
    setIsLoading(true);
    const signInResult = await signIn('google', { callbackUrl: 'http://localhost:3000/'});
  }
  
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Lottie Configuration
  const googleLoadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: googleLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

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
        {
          !isLoading ? 
              <button className="flex items-center justify-center w-4/5 max-w-[370px] py-4 mt-20 border-2 bg-white rounded-xl border-grey text-black relative hover:bg-grey button-animation" 
                type="button"
                onClick={handleLogin}>
                <Image src={Google} alt="Google" className="absolute left-3" />
                <p className="text-md text-center poppins-medium w-full">Masuk dengan Google</p>
              </button>
          : 
            <div className="flex items-center justify-center w-4/5 max-w-[370px] mt-20" >
              <Lottie 
                options={googleLoadingAnimationOptions}
                height={60}
                width={60}
              />
            </div>
        }
      </div>

      {/* Bottom Illustration */}
      <div className="absolute w-[25vw] mb-[20px] left-0 bottom-0">
        <Image src={ITB} alt="ITB" className="mx-auto" />
      </div>
      <div className="absolute w-[70vw] bottom-0 right-0 flex justify-end sm:translate-y-[15vw]">
        <Image src={WaveBot} alt="WaveBot" className="w-full" />
      </div>

      {/* Alert Box */}
      {showAlert && <AlertLogin onConfirm={handleConfirm} />}
    </div>
  );
};

export default Login;