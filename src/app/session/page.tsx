'use client'

// INI CUMA PAGE UNTUK TESTING

import { signOut, useSession } from 'next-auth/react';

const Tes = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div>
      {/* @Ignore id and role missing property */}
      <h1>{session?.user?.id}</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.role}</p>
      <button onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk' })}>Keluar</button>
    </div>
  );
};

export default Tes;