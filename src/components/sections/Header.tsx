import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Asset
import AttendanceIcon from '../icons/AttendanceIcon';

// Utils
import { date2String, dateTime2String } from '@/utils/date';
import ReportIcon from '../icons/ReportIcon';

interface HeaderProps {
  type: "attendance" | "report",
};

const Header = (props: HeaderProps): JSX.Element => {
  const { type } = props

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Clock
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const updateDate = () => {
    setCurrentDate(new Date());
  } 

  setInterval(updateDate, 1000);

  return (
    <div className="relative h-fit pt-[50px] flex flex-col justify-end">
      <div className="mb-7 transition-long">
        <h1
          ref={ref}
          className={`pt-10 text-neutral-100 display transition-long ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
        >
          {dateTime2String(currentDate)}
        </h1>
        <h2
          ref={ref}
          className={`text-neutral-100 body-m transition-long delay-200 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
        >
          {date2String(currentDate, false)}
        </h2>
      </div>

      <div className="absolute top-16 -right-16 md:hidden">
        {
          type === "attendance" ?
          <AttendanceIcon className="text-neutral-100 opacity-50" width="12rem" height="12rem" /> :
          <ReportIcon className="text-neutral-100 opacity-50" width="12rem" height="12rem" />

        }
      </div>
    </div>
  );
};

export default Header;
