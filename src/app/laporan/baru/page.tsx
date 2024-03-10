"use client"

import { useRef, useState } from 'react';

// Components
import FormHeader from '@/components/ui/FormHeader';

// Utils
import getTodayDate from '@/utils/getTodayDate';
import SubmitButton from '@/components/ui/SubmitButton';
import getTodayString from '@/utils/getTodayString';
import ReportGalleryInput from '@/components/ui/ReportGalleryInput';

const FormLaporan = (): JSX.Element => {
  // array photo path
  const [photoPath, setPhotoPath] = useState<File[]>([]);

  // function open file explorer
  const inputRef = useRef<HTMLInputElement>(null);
  const openFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPhotoPath([...photoPath, selectedFile]);
    }
  };

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const removePhoto = (index: number) => {
    setPhotoPath(photoPath.filter((_, i) => i !== index));
  }

  const [showAlert, setShowAlert] = useState(false);
  const handleJoinClick = (index : number): void => {
    setSelectedPhotoIndex(index);
    setShowAlert(true)
  }
  const handleConfirm = (): void => {
    if (selectedPhotoIndex !== null) {
      removePhoto(selectedPhotoIndex);
      setSelectedPhotoIndex(null);
    }
    setShowAlert(false);
  }
  const handleCancel = (): void => {
    setShowAlert(false);
  }

  return (
    <>
      <div className="w-screen min-h-screen h-fit flex flex-col items-center gap-5 bg-gradient-to-br from-green_main to-blue_main to-[50vh]">
      
        {/* Head */}
        <div className='w-11/12 max-w-[641px] py-10 flex flex-col items-center'>
          <FormHeader title='Laporan Kerja' date={getTodayDate()} />
          <ReportGalleryInput />
        </div>

        {/* Body */}
        <div className="w-full max-w-[641px] flex justify-center flex-grow py-6 bg-white rounded-t-[26px]">
          <div className='w-11/12 h-fit flex flex-col'>
            {/* Text input */}
            <h4 className="text-green_main text-base poppins-bold">Nama</h4>
            <h3 className="text-black text-xl poppins-medium">Ditra Rizqa Amadia</h3>
            <h4 className="text-green_main text-base mt-5 poppins-bold">Tanggal</h4>
            <h3 className="text-black text-xl poppins-medium">{getTodayString()}</h3>
            <h4 className="text-green_main text-base mt-5 poppins-bold">Deskripsi</h4>
            <textarea 
              rows={3} 
              value=""
              placeholder='Contoh: Menjaga gerbang kampus'
              className='px-3 py-2 mt-2 bg-grey_bg poppins-medium text-black placeholder:text-grey_text' 
            />

            {/* Submit button */}
            <div className="flex flex-col items-center pt-10">
              <SubmitButton text='Kirim' onClick={() => {}} loading={false} disable={false}/>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative h-auto flex flex-col items-center gap-5 w-auto bg-gradient-to-br from-teal-500 to-blue-600">
        <div className="flex flex-col items-center pt-10">
          <h2 className="text-white text-md font-semibold">{getToday()}</h2>
          <h1 className="text-white text-3xl font-extrabold">Laporan Kerja</h1>
        </div>
        <div className="max-w-[800px] w-full pt-10">
          <h2 className="text-white text-md font-extrabold pl-10">Foto Laporan (Maksimal 4)</h2>
          <div className="flex flex-wrap justify-center gap-[15px] py-10">
            {photoPath.map((photo, index) => (
              <div key={index} className="w-[170px] h-[170px] bg-transparent rounded-lg relative">
                <Image src={URL.createObjectURL(photo)} alt='Photo' layout='fill' objectFit='cover'></Image>
                <div className="absolute top-2 right-2 rounded-sm ">
                  <Image src={CloseButton} alt="Close Button" onClick={() => handleJoinClick(index)}></Image>
                </div>
              </div>
            ))}
            {photoPath.length === 4 ? null : <div className="w-[170px] h-[170px] bg-transparent rounded-lg flex justify-center items-center" onClick={openFile}>
              <Image src={AddButton} alt='Add Button'></Image>
              <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
            </div>}
          </div>
        </div>
        <div className="h-[70vh] max-w-[800px] w-full bg-white bottom-0 relative rounded-tl-[40px] rounded-tr-[40px] flex flex-col py-10 px-[5vw]">
          <div className='h-fit'>
            <h1 className="text-blue_main text-xl font-bold">Nama</h1>
            <h2 className="text-black text-xl">Bernardus Willson</h2>
            <h3 className="text-blue_main text-xl font-bold mt-5">Tanggal</h3>
            <h4 className="text-black text-xl">{getToday()}</h4>
            <h5 className="text-blue_main text-xl font-bold mt-5">Deskripsi</h5>
            <textarea className='resize-none border-none rounded-lg p-2 sm:w-[510px] md:w-[600px] w-full h-24 mt-1 outline-none bg-[#EDF1F6]'></textarea>
              <div className="flex flex-col items-center pt-10">
                <button className="bg-blue_main sm:w-[75%] w-full max-w-[400px] text-white text-xl font-bold rounded-lg mt-2 h-[40px]">Kirim</button>
              </div>
          </div>
        </div>
        {showAlert && <AlertDel onConfirm={handleConfirm} onCancel={handleCancel} />}
      </div> */}
    </>
  );
};
  
export default FormLaporan;