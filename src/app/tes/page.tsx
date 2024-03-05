'use client'

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Tes = (): JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    router.push("/");
    signOut();
  };

  useEffect(() => {
    if (!session?.user?.email) {
      router.push("/login");
    }
  }, [])


  return (
    <div>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      <Image src={session?.user?.image ?? ''} alt="Profile Picture" width={200} height={200} />
      <button
        onClick={handleLogout}
        className="border-2 bg-white rounded-xl py-4 px-5 mt-20 text-center relative mx-14 flex items-center hover:bg-grey"
      >
        <p className="text-md text-center font-semibold w-full">Sign Out</p>
      </button>
    </div>
  );
};

export default Tes;