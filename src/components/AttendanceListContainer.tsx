import { useState } from 'react';
import { easeInOut, motion} from 'framer-motion';

// Interfaces
import MonthRange from '@/interface/MonthRange';
import Attendance from '@/interface/FetchedAttendance';

// Components
import DateSearchBar from '@/components/ui/DateSearchBar';
import AttendanceCard from '@/components/ui/AttendanceCard';
import SweepLoader from '@/components/ui/SweepLoader';

// Utils
import { date2String } from '@/utils/date';

interface ListContainerProps {
  data: Attendance[],
  loading: boolean,
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { data, loading } = props;

  // Month range value
  const [monthRange, setMonthRange] = useState<MonthRange>({
    start: undefined,
    end: undefined,
  });

  // Handle change date input 
  const handleDateInputOnChange = (name: 'start' | 'end', value: Date | undefined) => {
    setMonthRange((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = () => {
    // TODO: Implement search
    console.log(monthRange);
  }
  
  return (
    <div className="w-full max-w-[641px] flex justify-center flex-grow bg-white rounded-t-[26px]">
      <div className='w-11/12 flex flex-col gap-6 pt-6'>
        <h1 className="text-black text-left text-2xl poppins-bold">Daftar Presensi</h1>
        <DateSearchBar 
          monthRange={monthRange}
          onChange={handleDateInputOnChange}
          onSearch={handleSearch}
        />

        <div className='w-full h-fit flex flex-col items-center gap-1'>
          {
            !loading && 
            data &&
            data[0] &&
            date2String(new Date(data[0].date)) != date2String(new Date()) &&
            <motion.div 
              initial={{
                opacity: 0,
                y: 50
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: easeInOut
                }
              }}
              viewport={{once: true}}  
              className='w-full'
            >
              <AttendanceCard
              id=''
              date={new Date()} 
              startAttendanceId={null}
              endAttendanceId={null} 
              />
            </motion.div>
          }
          {
            !loading ? 
            data && data.map((item: Attendance, index) => (
              <motion.div 
                key={index}
                initial={{
                  opacity: 0,
                  y: 50
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: easeInOut
                  }
                }}
                viewport={{once: true}}  
                className='w-full'
              >
                <AttendanceCard
                  id={item.id}
                  date={new Date(item.date)} 
                  startAttendanceId={item?.startLog[0]?.id as string}
                  endAttendanceId={item?.endLog[0]?.id as string} 
                />
              </motion.div>
            )) :
            <SweepLoader />
          } 
        </div>
      </div>
    </div>
  );
};

export default ListContainer;