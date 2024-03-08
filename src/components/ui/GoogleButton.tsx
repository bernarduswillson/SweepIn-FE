import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Lottie from "react-lottie";

// Assets
import Google from "@public/icons/google-ic.svg"
import googleLoadingAnimation from "@public/lotties/google-loading.json";

const GoogleButton = ():JSX.Element => {

  // Lottie Configuration
  const googleLoadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: googleLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + "/presensi"});
  }

  return(
    <div className="w-full">
    {
      !isLoading ? 
      <button className="flex items-center justify-center w-full py-4 mt-20 border-2 bg-white rounded-xl border-grey text-black relative hover:bg-grey button-animation" 
        type="button"
        onClick={handleLogin}>
        <Image src={Google} alt="Google" className="absolute left-3" />
        <p className="text-md text-center poppins-medium w-full">Masuk dengan Google</p>
      </button>
      :
      <div className="flex items-center justify-center w-full mt-20" >
        <Lottie 
          options={googleLoadingAnimationOptions}
          height={60}
          width={60}
        />
      </div>
    }
  </div>
  )
};

export default GoogleButton;