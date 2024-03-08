import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Asset
import Calendar from '@public/images/Calendar.svg';

interface HeaderProps {
  title: String
};

const Header = (props: HeaderProps):JSX.Element => {
  const { title } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getToday = () => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();
    
    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }

  return (
    <div className='relative h-fit flex flex-col justify-end pt-[50px]'>
      <div className='mb-7 transition ease-in-out duration-500'>
        <h1 ref={ref} className={`text-white text-5xl pt-10 poppins-extrabold -mb-2 transition ease-in-out duration-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>{title}</h1>
        <h2 ref={ref} className={`text-white text-md poppins-medium transition ease-in-out duration-500 delay-200 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>{getToday()}</h2>
      </div>

      <div className='absolute top-[50px] -right-[100px] md:hidden'>
        <Image src={Calendar} alt='Calendar' width={220} height={220} />
      </div>
    </div>
  );
};

export default Header;