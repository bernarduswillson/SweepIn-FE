import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Asset
import carouselRightArrow from '@public/icons/carousel-right-arrow-ic.svg';
import carouselLeftArrow from '@public/icons/carousel-left-arrow-ic.svg';

interface AttendancePhotoProps {
  startPhoto: string,
  endPhoto: string,
};

const AttendancePhoto = (props: AttendancePhotoProps) => {
  const { startPhoto, endPhoto } = props;

  // In view photo state
  const [page, setPage] = useState<number>(0);

  // Handle paginate carousel
  const paginate = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className='w-full relative h-fit mt-14 flex justify-center'>
      <div className='w-fit h-72 flex justify-between items-center gap-5'>
      
        <div className={`relative w-10 h-10 transition-opacity duration-150 ease-in-out ${page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-1 cursor-pointer'} hover:opacity-70`} onClick={() => paginate(0)}>
          <Image src={carouselLeftArrow} alt='panah kiri' fill={true} objectFit='cover'/>
        </div>

        <div className='relative w-72 h-72 flex justify-between items-center'>
          <AnimatePresence initial={false}>
            {
              page === 0 &&
              <motion.div
                key={1} 
                className={`absolute w-72 h-72 overflow-hidden flex justify-center items-center border-[5px] border-white rounded-xl`}
                initial={{
                  zIndex: 0,
                  opacity: 0,
                  x: -100
                }}
                animate={{
                  zIndex: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
                exit={{
                  zIndex: 0,
                  opacity: 0,
                  x: -100,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
              >
                <Image src={startPhoto} alt="Foto kehadiran" fill={true} objectFit='cover' className='rounded-[7px]'/>
              </motion.div>
            }
            {
              page === 1 &&
              <motion.div 
                className={`absolute w-72 h-72 overflow-hidden flex justify-center items-center border-[5px] border-white rounded-xl`}
                key={2}
                initial={{
                  zIndex: 0,
                  opacity: 0,
                  x: 100
                }}
                animate={{
                  zIndex: 1,
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
                exit={{
                  zIndex: 0,
                  opacity: 0,
                  x: 100,
                  transition: {
                    duration: 0.3,
                    ease: 'easeInOut'
                  }
                }}
              >
                <Image src={endPhoto} alt="Foto kehadiran" fill={true} objectFit='cover' className='rounded-[7px]'/>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className={`relative w-10 h-10 transition-opacity duration-150 ease-in-out ${page === 1 ? 'opacity-0 pointer-events-none' : 'opacity-1 cursor-pointer'} hover:opacity-70`} onClick={() => paginate(1)}>
          <Image src={carouselRightArrow} alt='panah kanan' fill={true} objectFit='cover'/>
        </div>

      </div>
    </div>
  );
};

export default AttendancePhoto;