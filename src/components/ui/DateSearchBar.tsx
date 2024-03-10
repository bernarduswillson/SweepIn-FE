import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// Asset
import Icon from '@public/icons/calendar-ic.svg';

// Interfaces
import MonthRange from '@/interface/MonthRange';

// Components
import { Calendar } from "@/components/ui/Calendar";
import Button from '@/components/ui/Button';

interface SearchBarProps {
  monthRange: MonthRange
  onChange: (name: 'start' | 'end', value: Date | undefined) => void, 
  onSearch: () => void
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { monthRange, onChange, onSearch } = props;

  // Show calendar form
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);
  const [showCalendarTo, setShowCalendarTo] = useState(false);

  // Date values
  const [dateFrom, setDateFrom] = useState<Date | undefined>(monthRange.start);
  const [dateTo, setDateTo] = useState<Date | undefined>(monthRange.end);
  
  // End date validation
  const [isRangeValid, setIsRangeValid] = useState<Boolean>(false); 

  // Handle change date value 
  useEffect(() => {
    setDateFrom(dateFrom);
    setDateTo(dateTo);
    onChange('start', dateFrom);
    onChange('end', dateTo);

    if (dateTo && dateFrom) {
      setIsRangeValid(dateTo >= dateFrom)
    }
  }, [dateFrom, dateTo])

  // Hanlde select date
  const handleOkeButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    return undefined;
  };

  return (
    <div className='w-full flex gap-2'>

      {/* Start date input */}
      <button className={`w-[40%] flex justify-between items-center py-1 px-2 pl-3 border-grey border-2 rounded-xl poppins-medium ${monthRange.start ? 'text-black' : 'text-grey_text'}`} 
        onClick={() => setShowCalendarFrom(true)}
      >
        {monthRange.start ? convertDateToString(monthRange.start) : 'Mulai'}

        {/* Calendar icon */}
        <Image src={Icon} alt='Calendar' width={25} />

        {/* Calendar form */}
        {showCalendarFrom && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10' onClick={handleOkeButtonClick}></div>
            <div className='fixed top-1/2 left-1/2 flex flex-col py-5 px-5 items-center gap-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
              <div className='text-black poppins-bold'>Pilih Tanggal Mulai</div>
              <Calendar
                mode="single"
                selected={monthRange.start}
                onSelect={setDateFrom}
              />
              <button className='w-[80px]' onClick={(e) => handleOkeButtonClick(e)}>
                <Button text='Pilih' color='green' />
              </button>
            </div>
          </>
        )}
      </button>

      {/* End date input */}
      <button className={`w-[40%] flex justify-between items-center py-1 px-2 pl-3 border-2 rounded-xl poppins-medium ${!monthRange.start ? 'text-grey_text border-grey' : isRangeValid ? 'text-black border-grey' : 'text-red_main border-red_main'}`} 
        onClick={() => setShowCalendarTo(true)}
      >
        {monthRange.end ? convertDateToString(monthRange.end) : 'Akhir'}

        {/* Calendar icon */}
        <Image src={Icon} alt='Calendar' width={25} />

        {/* Calendar form */}
        {showCalendarTo && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10' onClick={handleOkeButtonClick}></div>
            <div className='fixed top-1/2 left-1/2 flex flex-col py-5 px-5 items-center gap-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow'>
              <div className='text-black poppins-bold'>Pilih Tanggal Akhir</div>
              <Calendar
                mode="single"
                selected={monthRange.end}
                onSelect={setDateTo}
              />
              <div className='w-full h-fit flex flex-col items-center gap-2'>
                {
                  !isRangeValid && 
                  <span className='text-sm text-red_main poppins-medium'>Tanggal akhir harus setelah tanggal awal</span>
                }
                <button className='w-[80px]' onClick={(e) => handleOkeButtonClick(e)}>
                  <Button color='green' text='Pilih' disable={!isRangeValid} />
                </button>
              </div>
            </div>
          </>
        )}
      </button>

      {/* Cari */}
      <div className='w-[20%]'>
        <Button text="Cari" color='green' disable={!isRangeValid} onClick={onSearch}/>
      </div>
    </div>
  )
}

export default SearchBar