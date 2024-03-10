import React from 'react';
import Image from 'next/image';

interface ReportGalleryProps {
  photos: string[],
}

const ReportGallery = (props: ReportGalleryProps) => {
  const { photos } = props;

  return (
    <div className="w-fit mt-10">
      <div className="max-w-[355px] w-full flex flex-wrap justify-left gap-[15px]">
        {
          photos.length > 0 && 
          photos.map((photo, index) => (
            <div key={index} className="relative w-[170px] h-[170px] bg-red-500 flex justify-center items-center overflow-hidden rounded-lg">
              <Image src={photo} alt='Foto laporan' fill={true} objectFit='cover'/>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ReportGallery;