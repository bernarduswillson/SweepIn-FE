import { useState, useEffect } from 'react';
import { easeInOut, motion} from 'framer-motion';

// Interfaces
import MonthRange from '@/interface/MonthRange';
import Attendance from '@/interface/Attendance';
import Report from '@/interface/Report';

// Components
import DateSearchBar from '@/components/ui/DateSearchBar';
import AttendanceCard from '@/components/ui/AttendanceCard';
import ReportCard from '@/components/ui/ReportCard';
import SweepLoader from '@/components/ui/SweepLoader';
import { date2String } from '@/utils/date';

interface ListContainerProps {
  title: 'Daftar Presensi' | 'Daftar Laporan',
  data: (Attendance | Report)[],
  loading: boolean,
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { title, data, loading } = props;

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
          {
            !loading && 
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
              {
                ('startLogId' in data[0]) &&
                <AttendanceCard
                id=''
                date={new Date()} 
                startAttendanceId={null}
                endAttendanceId={null} 
              />
              }
              {
                ('numOfPhoto' in data[0]) &&
                <ReportCard
                  id=''
                  numOfPhoto={0}
                  date={new Date()}
                  status='belum dikirim'
                />
              }
            </motion.div>
          }
          {
            !loading ? 
            data && data.map((item: Attendance | Report, index) => (
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
                {
                  ('startLogId' in item) &&
                  <AttendanceCard
                    id={item.id}
                    date={new Date(item.date)} 
                    startAttendanceId={item.startLogId}
                    endAttendanceId={item.endLogId} 
                  />
                }
                {
                  ('numOfPhoto' in item) &&
                  <ReportCard
                    id={item.id}
                    numOfPhoto={item.numOfPhoto}
                    date={new Date(item.date)}
                    status={item.status}
                  />
                }
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