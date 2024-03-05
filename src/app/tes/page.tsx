'use client'

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Tes = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/masuk' })}>Logout</button>
    </div>
  );
};

export default Tes;