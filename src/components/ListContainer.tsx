import { useState, useEffect } from 'react';
import { easeInOut, motion} from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';

// Interfaces
import MonthRange from '@/interface/MonthRange';
import Attendance from '@/interface/Attendance';

// Components
import DateSearchBar from '@/components/ui/DateSearchBar';
import Card from '@/components/ui/AttendanceCard';
import SweepLoader from '@/components/ui/SweepLoader';

interface ListContainerProps {
  title: 'Daftar Presensi' | 'Daftar Laporan'
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { title } = props;

  // Fetch data
  // TODO: Get the user id from session
  const { data, loading } = useFetch(`/api/activity/user/65e977f9ff15a6ab52da402a`)

  // Today's data
  const [todayData, setTodayData] = useState<Attendance>({
    id: '',
    createdAt: new Date().toISOString(),
    startLogId: null,
    endLogId: null
  })

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
        <h1 className="text-black text-left text-2xl poppins-bold">{title}</h1>
        <DateSearchBar 
          monthRange={monthRange}
          onChange={handleDateInputOnChange}
          onSearch={handleSearch}
        />

        <div className='w-full h-fit flex flex-col items-center gap-1'>
          <Card
            id={todayData.id}
            date={new Date(todayData.createdAt)} 
            startAttendanceId={todayData.startLogId}
            endAttendanceId={todayData.endLogId} 
          />
          {
            !loading ? 
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
                  date={new Date(item.createdAt)} 
                  startAttendanceId={item.startLogId}
                  endAttendanceId={item.endLogId} 
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