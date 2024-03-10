import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Image from 'next/image';

// Asset
import AddIcon from '@public/icons/plus-ic.svg';
import DeleteIcon from '@public/icons/close-ic.svg';

// Components
import Modal from '@/components/ui/Modal';

interface ReportGalleryInputProps {
  photos: File[],
  setPhotos: Dispatch<SetStateAction<File[]>>
}

const ReportGalleryInput = (props: ReportGalleryInputProps) => {
  const { photos, setPhotos } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Open files
  const openFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  // Handle on click delete
  const handleOnClickDelete = (index : number): void => {
    setSelectedPhotoIndex(index);
    setShowDeleteModal(true);
  }

  // Handle delete files
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  // Handle files change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPhotos([...photos, selectedFile]);
    }
  };

  // Handle on confirm modal
  const handleConfirmModal = () => {
    if (selectedPhotoIndex != null) {
      removePhoto(selectedPhotoIndex);
    }
    setShowDeleteModal(false);
  }

  return (
    <div className="w-full mt-10">
      <h2 className="text-white text-base poppins-bold">Foto Laporan (Maks 4)</h2>
      <div className=" mt-6 flex flex-wrap justify-center gap-[15px]">
        {
          photos.length > 0 && 
          photos.map((photo, index) => (
            <div key={index} className="relative w-[170px] h-[170px] flex justify-center items-center overflow-hidden rounded-lg">
              <Image src={URL.createObjectURL(photo)} alt='Foto laporan' width={170} height={170} />
              <div className="absolute top-2 right-2 rounded-sm">
                <div
                  onClick={() => handleOnClickDelete(index)} 
                  className='w-[26px] h-[26px] flex justify-center items-center bg-red_main rounded-md cursor-pointer transition-colors duration-150 ease-in-out hover:bg-red_dark'
                >
                  <Image src={DeleteIcon} alt="Close Button"></Image>
                </div>
              </div>
            </div>
          ))
        }
        {
          photos.length !== 4 && 
          <button className="w-[170px] h-[170px] bg-transparent flex flex-col justify-center items-center gap-3 cursor-pointer rounded-lg border-dashed border-white border-2 transition-opacity ease-in-out duration-150 group" 
            onClick={openFile}
          >
            <Image src={AddIcon} alt='Foto kosong' width={24} height={24} className='transition-transform ease-in-out duration-150 group-hover:-translate-y-2'/>
            <span className='poppins-medium text-white text-base'>Ambil foto</span>
            <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
          </button>}
      </div>

      <Modal title='Hapus foto?' msg='Apakah anda yakin ingin menghapus foto ini?' type='danger' confirmText='Hapus' onConfirm={handleConfirmModal} onClose={() => setShowDeleteModal(false)} isOpen={showDeleteModal} cancelText='Batal'/>
    </div>
  );
};

export default ReportGalleryInput;