import React, { useRef, useState } from 'react';
import Image from 'next/image';

// Asset
import AddIcon from '@public/icons/plus-ic.svg';

const ReportGalleryInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // List of photos
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <div className="w-full mt-10">
      <h2 className="text-white text-base poppins-bold">Foto Laporan (Maks 4)</h2>
      <div className="flex flex-wrap justify-center gap-[15px] py-10">
        {photos.map((photo, index) => (
          <div key={index} className="w-[300px] h-[300px] bg-transparent rounded-lg relative">
            <Image src={URL.createObjectURL(photo)} alt='Photo' layout='fill' objectFit='cover'></Image>
            <div className="absolute top-2 right-2 rounded-sm ">
              {/* <Image src={CloseButton} alt="Close Button" onClick={() => {}}></Image> */}
            </div>
          </div>
        ))}
        {photos.length === 4 ? null : 
        <button className="w-[170px] h-[170px] bg-transparent flex flex-col justify-center items-center gap-3 cursor-pointer rounded-lg border-dashed border-white border-2 transition-opacity ease-in-out duration-150 group" 
          onClick={() => {}}
        >
          <Image src={AddIcon} alt='Foto kosong' width={24} height={24} className='transition-transform ease-in-out duration-150 group-hover:-translate-y-5'/>
          <span className='poppins-medium text-white text-base'>Ambil foto</span>
          <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={() => {}}/>
        </button>}
      </div>
    </div>
  );
};

export default ReportGalleryInput;