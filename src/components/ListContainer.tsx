import { useState } from 'react';

// Interfaces
import MonthRange from '@/app/interface/MonthRange';

// Components
import DateSearchBar from '@/components/ui/DateSearchBar';

interface ListContainerProps {
  title: String
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { title } = props;

  // Get today date
  const getToday = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Month range value
  const [monthRange, setMonthRange] = useState<MonthRange>({
    start: undefined,
    end: undefined,
  });

  const handleDateInputOnChange = (name: 'start' | 'end', value: Date | undefined) => {
    setMonthRange((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="w-full max-w-[641px] h-full flex justify-center bg-white rounded-t-[26px]">
      <div className='w-11/12 flex flex-col gap-6 pt-6'>
        <h1 className="text-black text-left text-2xl poppins-bold">{title}</h1>
        <DateSearchBar 
          monthRange={monthRange}
          onChange={handleDateInputOnChange}
        />

        <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
          <div className='w-full h-fit gap-1'>
            {/* {DataPresensi.map((data, index) => (
              <Card key={index} date={data.date} status={data.status} />
            ))}  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContainer;