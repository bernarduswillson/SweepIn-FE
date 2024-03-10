import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

// Component
import Button from '@/components/ui/Button.tsx';

// Asset
import shutterButton from '@public/icons/shutter-button.svg';

interface AttendancePhotoInputProps {
  photo: string,
  setPhoto: (name: string, value: string | Date | number | undefined) => void
};

const AttendancePhotoInput = (props: AttendancePhotoInputProps) => {
  const { photo, setPhoto } = props;

  // Capture photo
  const capturePhoto = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
          const imageSrc = URL.createObjectURL(file);
          setPhoto('photo', imageSrc);
      }
    };
    input.click();
  };

  return (
    <div className='w-full h-fit mt-14 flex flex-col items-center gap-7'>
      <div className='relative w-72 h-72 overflow-hidden flex justify-center items-center border-[5px] border-white rounded-xl'>
        {
          photo ? 
          <Image src={photo} alt="Foto kehadiran" fill={true} objectFit='cover' className='rounded-[7px]'/> : 
          <button onClick={capturePhoto} className='w-full h-full bg-grey_bg flex flex-col justify-center items-center gap-3 transition-opacity ease-in-out duration-150 group hover:opacity-90'>
            <Image src={shutterButton} alt='Foto kosong' width={50} height={50} className='transition-transform ease-in-out duration-150 group-hover:-translate-y-5'/>
            <span className='poppins-medium text-grey text-base'>Ambil foto</span>
          </button>
        }
      </div>
      <AnimatePresence>
        {
          <motion.div 
            className='w-44 pointer-events-auto'
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: photo ? 1 : 0,
              transition: {
                duration: 0.15,
                ease: easeInOut
              }
            }}
          >
            <Button text="Ambil ulang" color='white' onClick={capturePhoto} />
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default AttendancePhotoInput;