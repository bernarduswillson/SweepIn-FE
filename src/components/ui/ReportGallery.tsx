import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Utils
import bufferToBase64 from '@/utils/image';

interface ReportGalleryProps {
  photos: {
    type: string,
    data: number[],
  }[]
}

const ReportGallery = (props: ReportGalleryProps) => {
  const { photos } = props;

  const photosBase64 = photos.map(photo => bufferToBase64(photo.data));

  return (
    <div className="w-fit mt-10">
      <div className="max-w-[355px] w-full flex flex-wrap justify-left gap-[15px]">
        {
          photosBase64.length > 0 && 
          photosBase64.map((photo, index) => (
            <motion.div 
              key={index} 
              className="relative w-[170px] h-[170px] bg-grey_bg flex justify-center items-center overflow-hidden rounded-lg"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  ease: 'backInOut',
                  duration: 0.3,
                  delay: 0.1 * index
                }
              }}
            >
              <Image src={`data:image/png;base64,${photo}`} alt='Foto laporan' fill={true} objectFit='cover'/>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
};

export default ReportGallery;