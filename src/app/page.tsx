"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = (): JSX.Element => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user) {
      router.push("/presensi");
    } else {
      router.push("/login")
    }
  }, [session]);

  return (
    <div className="relative h-auto">
    </div>
  );
};

export default Page;