import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

// Asset
import Calendar from '@public/images/calendar.svg';
import TablerReport from '@public/images/tabler-report.svg';
import getToday from "@/utils/getTodayString";

interface HeaderProps {
  title: String
};

const Header = (props: HeaderProps):JSX.Element => {
  const { title } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className='relative h-fit flex flex-col justify-end pt-[50px]'>
      <div className='mb-7 transition ease-in-out duration-500'>
        <h1 ref={ref} className={`text-white text-5xl pt-10 poppins-extrabold transition ease-in-out duration-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>{title}</h1>
        <h2 ref={ref} className={`text-white text-md poppins-medium transition ease-in-out duration-500 delay-200 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>{getToday()}</h2>
      </div>

      <div className='absolute top-0 -right-[20px] md:hidden'>
        {/* TODO: Handle image overflow in /laporan */}
        <Image src={title === 'Presensi' ? Calendar : TablerReport} alt='Calendar' width={220} height={220} />
      </div>
    </div>
  );
};

export default Header;