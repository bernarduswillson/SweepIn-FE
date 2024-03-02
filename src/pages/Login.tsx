"use client"

// Imports
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

// Assets
import WaveTop from "@/images/Login/WaveTop.svg"
import WaveBot from "@/images/Login/WaveBot.svg"
import ITB from "@/images/Logo/ITB.svg"
import Google from "@/images/Logo/Google.svg"

const Login = (): JSX.Element => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [])

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
          <h1 className="text-[50px] text-center text-blue_main font-extrabold">
            Sweep
            <span className="outline-title text-white">
              In
            </span>
          </h1>
          <p className="text-center text-md text-text_grey">Masuk untuk melanjutkan</p>
        </div>

        {/* Google Login Button */}
        {providers && Object.values(providers).map((provider : any) => (
          <button className="border-2 bg-white rounded-xl py-4 px-5 mt-20 text-center relative mx-14 flex items-center hover:bg-grey" 
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}>
            <Image src={Google} alt="Google" className="mx-3" />
            <p className="text-md text-center font-semibold w-full mr-3">Login dengan Google</p>
          </button>
        ))}

        {/* NANTI HAPUS */}
        <pre>{JSON.stringify(session, null, 2)}</pre>
          
        {/* Sign Out NANTI HAPUS */}
        <button onClick={() => signOut()} className="border-2 bg-white rounded-xl py-4 px-5 mt-20 text-center relative mx-14 flex items-center hover:bg-grey">
          <p className="text-md text-center font-semibold w-full">Sign Out</p>
        </button>
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

export default Login;