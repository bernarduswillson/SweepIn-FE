'use client'

// INI CUMA PAGE UNTUK TESTING

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// Interface
import User from '@/interface/User'

const Tes = (): JSX.Element => {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session) {
      setUser(session.user as User)
    }
  }, [session])

  return (
    <div>
      <h1>{user?.name}</h1>
      <h4>{user?.id}</h4>
      <h3>{user?.role}</h3>
      <h5>{user?.email}</h5>
      <button
        onClick={() =>
          signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk' })
        }
      >
        Keluar
      </button>
    </div>
  )
}

export default Tes
