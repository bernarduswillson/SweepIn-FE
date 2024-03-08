import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// Asset
import Icon from '@/images/Presensi/CalendarIcon.svg';

// Interfaces
import MonthRange from '@/app/interface/MonthRange';

// Components
import { Calendar } from "@/components/ui/calendar";
import Button from '@/components/ui/Button';

interface SearchBarProps {
  monthRange: MonthRange
  onChange: (name: 'start' | 'end', value: Date | undefined) => void, 
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { monthRange, onChange } = props;

  // Date values
  const [dateFrom, setDateFrom] = useState<Date | undefined>(monthRange.start);
  const [dateTo, setDateTo] = useState<Date | undefined>(monthRange.end);
  useEffect(() => {
    onChange('start', dateFrom);
    onChange('end', dateTo);
  }, [dateFrom, dateTo])

  // Show calendar form
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);
  const [showCalendarTo, setShowCalendarTo] = useState(false);

  // Hanlde select date
  const handleOkeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDateFrom(dateFrom);
    setDateTo(dateTo);
    setShowCalendarFrom(false);
    setShowCalendarTo(false);
  };

  // Conver date from Date to String (dd/mm/yyyy)
  const convertDateToString = (date: Date) => {
    if (date instanceof Date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
    return 'NaN'
  };

  return (
    <div className='w-full flex'>

      {/* Start button */}
      <button className='flex justify-between w-[40%] border-2 rounded-xl text-text_grey py-1 px-2 mr-2' 
        onClick={() => setShowCalendarFrom(true)}
      >
        {monthRange.start && convertDateToString(monthRange.start)}

        {/* Calendar icon */}
        <Image src={Icon} alt='Calendar' width={25} />

        {/* Calendar form */}
        {showCalendarFrom && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
              <div className='text-black pt-3 font-bold'>Pilih tanggal dari</div>
              <Calendar
                mode="single"
                selected={monthRange.start}
                onSelect={setDateFrom}
              />
              <button className='bg-blue_main text-white px-4 py-1 rounded-xl mb-3 font-bold hover:opacity-80' onClick={(e) => handleOkeButtonClick(e)}>
                Pilih
              </button>
            </div>
          </>
        )}
      </button>

      {/* End button */}
      <button className='flex justify-between w-[40%] border-2 rounded-xl text-text_grey py-1 px-2 mr-2' 
        onClick={() => setShowCalendarTo(true)}
      >
        {monthRange.end && convertDateToString(monthRange.end)}

        {/* Calendar icon */}
        <Image src={Icon} alt='Calendar' width={25} />

        {/* Calendar form */}
        {showCalendarTo && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
              <div className='text-black pt-3 font-bold'>Pilih tanggal sampai</div>
              <Calendar
                mode="single"
                selected={monthRange.end}
                onSelect={setDateTo}
              />
              <button className='bg-blue_main text-white px-4 py-1 rounded-xl mb-3 font-bold hover:opacity-80' onClick={(e) => handleOkeButtonClick(e)}>
                Pilih
              </button>
            </div>
          </>
        )}
      </button>

      {/* Cari */}
      <div className='w-[120px] h-full'>
        <Button text="Cari" />
      </div>
    </div>
  )
}

export default SearchBar