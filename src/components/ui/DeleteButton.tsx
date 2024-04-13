import Lottie from 'react-lottie';
import { useState } from 'react';

// Asset
import spinnerLoaderAnimation from '@public/lotties/spinner-loading.json';

// Components
import Modal from '@/components/ui/Modal';

interface DeleteButtonProps {
  text: string,
  disable?: boolean,
  onClick?: () => void,
  loading?: boolean
  username?: string
};

const DeleteButton = (props: DeleteButtonProps):JSX.Element => {
  const { text, disable, onClick, loading, username } = props;

  // Lottie Configuration
  const spinnerLoaderAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerLoaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  // Delete
  const handleDelete = () => {
    if (onClick) {
      onClick();
    }
  };

  // Open confirmation modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  // Close confirmation modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='w-full'>
      <Modal 
        title={`Hapus akun "${username}"`}
        msg="Anda akan menghapus akun ini. Apakah Anda yakin?"
        type='danger'
        confirmText='Hapus'
        onConfirm={handleDelete} 
        cancelText='Batal'
        onClose={handleCloseModal}
        isOpen={isModalOpen}
      />
      <button 
        onClick={handleOpenModal}
        disabled={!!disable || loading} 
        className={`w-full h-10 py-3 flex gap-5 justify-center items-center text-white rounded-md bg-red_main
        ${disable || loading ? 'opacity-50' : `opacity-100 bg-red_dark`} text-xl poppins-bold button-animation`}
      >
        {
          loading ?
          <div>
            <Lottie 
            options={spinnerLoaderAnimationOptions}
            height={30}
            width={30}
            /> 
          </div> :
          null
        }
        <span>{loading ? 'Loading...' : text}</span>
      </button>
    </div>
  )
}

export default DeleteButton;