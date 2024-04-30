import { useState } from 'react'
import { signOut } from 'next-auth/react'

import LogoutIcon from '@/components/icons/LogoutIcon'
import WarningModal from '@/components/dialouge/WarningModal'

const LogoutButton = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)

  // Logout
  const handleLogout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/masuk' })
  }

  // Open confirmation modal
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // Close confirmation modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <WarningModal
        title="Anda akan keluar"
        msg="Anda akan keluar dari aplikasi ini. Apakah Anda yakin?"
        confirmText="Keluar"
        onConfirm={handleLogout}
        cancelText="Batal"
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />

      <button className="flex items-center group" onClick={handleOpenModal}>
        <div className='transition-fast group-hover:-translate-x-[8px]'>
          <LogoutIcon className='text-neutral-100' width={20} height={20} />
        </div>
        <div className="ml-2 body-sm text-neutral-100">Keluar</div>
      </button>
    </div>
  )
}

export default LogoutButton
