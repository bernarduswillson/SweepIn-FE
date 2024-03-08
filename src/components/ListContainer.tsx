import { useState, useEffect } from 'react';
import { easeInOut, motion} from 'framer-motion';

// Interfaces
import MonthRange from '@/interface/MonthRange';
import AttendanceDataProps from '@/interface/Attendance';

// Components
import DateSearchBar from '@/components/ui/DateSearchBar';
import Card from '@/components/ui/Card';
import SweepLoader from '@/components/ui/SweepLoader';

// Data
import AttendanceData from "@/data/attendanceDummy.json";

interface ListContainerProps {
  title: 'Daftar Presensi' | 'Daftar Laporan'
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { title } = props;

  // Loading state
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // Data
  const [data, setData] = useState<AttendanceDataProps[] | undefined>(undefined);

  // Month range value
  const [monthRange, setMonthRange] = useState<MonthRange>({
    start: undefined,
    end: undefined,
  });

  // Fetch data
  useEffect(() => {
    setTimeout(() => {
      setData(AttendanceData);
      setIsLoading(false);
    }, 10000)
  }, [])

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
    <div className="w-full max-w-[641px] flex justify-center bg-white rounded-t-[26px]">
      <div className='w-11/12 flex flex-col gap-6 pt-6'>
        <h1 className="text-black text-left text-2xl poppins-bold">{title}</h1>
        <DateSearchBar 
          monthRange={monthRange}
          onChange={handleDateInputOnChange}
          onSearch={handleSearch}
        />

        <div className='flex-1 mt-5 rounded-xl'>
          <div className='w-full h-fit flex flex-col items-center gap-1'>
            {
              !isLoading ? 
              data && data.map((item, index) => (
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
                  <Card
                    id={item.id}
                    date={new Date(item.date)} 
                    startAttendanceId={item.startAttendanceId}
                    endAttendanceId={item.endAttendanceId} 
                  />
                </motion.div>
              )) :
              <SweepLoader />
            } 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContainer;