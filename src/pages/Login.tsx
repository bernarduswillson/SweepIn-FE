"use client"

// Imports
import Image from "next/image";

// Assets
import WaveTop from "@/images/Login/WaveTop.svg"
import WaveBot from "@/images/Login/WaveBot.svg"
import ITB from "@/images/Logo/ITB.svg"
import Google from "@/images/Logo/Google.svg"

const Login = (): JSX.Element => {

  const handleGoogle = () => {
    console.log("Google");
  }

  return (
    <div className="relative h-screen bg-white font-bold flex flex-col justify-center">
      <div className="absolute w-screen top-0">
        <Image src={WaveTop} alt="WaveTop" className="w-full" />
      </div>

      <div className="">
        <div>
          <h1 className="text-[50px] text-center text-blue_main font-extrabold">
            Sweep
            <span className="outline-title text-white">
              In
            </span>
          </h1>
          <p className="text-center text-sm text-text_grey">Masuk untuk melanjutkan</p>
        </div>
        <div className="border-2 bg-white rounded-xl py-4 px-5 mt-20 text-center relative mx-14 flex items-center hover:bg-grey" onClick={handleGoogle}>
          <Image src={Google} alt="Google" className="mx-3" />
          <p className="text-sm text-center w-full">Login dengan Google</p>
        </div>
      </div>

      <div className="absolute w-[25vw] mb-[20px] left-0 bottom-0">
        <Image src={ITB} alt="ITB" className="w-[50%] mx-auto" />
      </div>
      <div className="absolute w-[70vw] bottom-0 right-0 flex justify-end">
        <Image src={WaveBot} alt="WaveBot" className="w-full" />
      </div>
    </div>
  );
};

export default Login;