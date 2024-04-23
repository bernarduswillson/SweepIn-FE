import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { useRouter, usePathname } from 'next/navigation'

// Asset
import Icon from '@public/icons/calendar-ic.svg'

// Components
import { Calendar } from '@/components/ui/calendar'
import Button from '@/components/ui/button'

interface SearchBarProps {
  onChange: (name: 'start' | 'end', value: Date | undefined) => void
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { onChange } = props

  const router = useRouter()
  const url = usePathname()
  const page = url.split('/')[2]

  // Show calendar form
  const [showCalendar, setShowCalendar] = useState(false)

  // Date values
  const [date, setDate] = useState<DateRange | undefined>()
  const [finalDate, setFinalDate] = useState<DateRange | undefined>()

  // Validation
  const [isValid, setIsValid] = useState<Boolean>(false)


  // Handle select date
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setFinalDate(date);

    const dateFrom = date?.from;
    const dateTo = date?.to;
    onChange('start', dateFrom);
    onChange('end', dateTo);
    setShowCalendar(false);
  };

  // Handle reset date
  const handleResetButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    setDate(undefined)
    setFinalDate(undefined)
    setIsValid(false)

    onChange('start', undefined);
    onChange('end', undefined);
    setShowCalendar(false)
  }

  // Handle click outside
  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(finalDate);
    setShowCalendar(false);
  };

  // Check if date is valid
  useEffect(() => {
    if (date) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  
    if (date?.from && !date?.to) {
      setDate({ from: date.from, to: date.from })
    }
  }, [date])

  // Convert date from Date to String (dd/mm/yyyy)
  const convertDateToString = (date: Date) => {
    if (date instanceof Date) {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear().toString().slice(-2)
      return `${day}/${month}/${year}`
    }
    return undefined
  }

  return (
    <div className="w-full flex gap-2">
      {/* Start date input */}
      <button
        className={`w-full flex justify-between items-center py-1 px-2 pl-3 border-grey border-2 rounded-xl poppins-medium ${date && isValid ? 'text-black' : 'text-grey_text'}`}
        onClick={() => setShowCalendar(true)}
      >
        {date && isValid ? 
          (date.from === date.to ? 
            `${convertDateToString(date.from as Date)}` : 
            `${convertDateToString(date.from as Date)} — ${convertDateToString(date.to as Date)}`) 
          : 
          'Pilih Tanggal'
        }

        {/* Calendar icon */}
        <Image src={Icon} alt="Calendar" width={25} />

        {/* Calendar form */}
        {showCalendar && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
              onClick={(e) => handleClickOutside(e)}
            ></div>
            <div className="fixed top-1/2 left-1/2 flex flex-col py-5 px-5 items-center gap-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow">
              <div className="text-black poppins-bold">Pilih Tanggal</div>
              <div className="text-black poppins-bold -mt-5">(tekan 2 tanggal yang berbeda untuk memilih rentang tanggal)</div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
              <button
                className="w-[80px]"
                onClick={(e) => handleButtonClick(e)}
              >
                <Button text="Pilih" color="green" disable={!isValid} />
              </button>
              <button
                className="-mt-2"
                onClick={(e) => handleResetButtonClick(e)}
              >
                <Button text="Reset Tanggal" color="blue" />
              </button>
            </div>
          </>
        )}
      </button>
    </div>
  )
}

export default SearchBar
