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
import RedButton from '../buttons/RedButton'
import GreenButton from '../buttons/GreenButton'
import CalendarIcon from '../icons/CalendarIcon'

interface SearchBarProps {
  withLabel?: boolean,
  onChange: (name: 'start' | 'end', value: Date | undefined) => void
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { withLabel, onChange } = props

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
      <div className='w-1/2'>
        {
          withLabel && 
          <h3 className='poppins-bold'>Tanggal Awal</h3>
        }
        <button
            className={`w-full text-input flex justify-between items-center body-m ${date && isValid ? 'text-neutral-900' : 'text-neutral-400'}`}
            onClick={() => setShowCalendar(true)}
        >
            {date && isValid ? 
                `${convertDateToString(date.from as Date)}` 
            : 
            'Dari'
            }

            {/* Calendar icon */}
            <CalendarIcon className="text-primary-500" width="1.2rem" height="1.2rem" />

        </button>
      </div>

      {/* Start date input */}
      <div className='w-1/2'>
        {
          withLabel && 
          <h3 className='poppins-bold'>Tanggal Akhir</h3>
        }
        <button
            className={`w-full text-input flex justify-between items-center body-m ${date && isValid ? 'text-neutral-900' : 'text-neutral-400'}`}
            onClick={() => setShowCalendar(true)}
        >
            {date && isValid ?
                `${convertDateToString(date.to as Date)}` 
            : 
            'Sampai'
            }

            {/* Calendar icon */}
            <CalendarIcon className="text-primary-500" width="1.2rem" height="1.2rem" />
        </button>
      </div>

      {/* Calendar form */}
      {showCalendar && (
          <div
            className="fixed overflow-auto z-50 inset-0 w-full h-full bg-scrim backdrop-blur flex justify-center items-center"
          >
            <div className="fixed w-full h-full inset-0 -z-10" onClick={(e) => handleClickOutside(e)} />

            <div className="w-11/12 py-6 px-4 bg-surface rounded-md flex flex-col items-center gap-5 md:w-fit">
              <div className="text-neutral-900 header-3">Pilih Tanggal</div>
              
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
              
              <div className='w-[120px]'
                onClick={(e) => handleButtonClick(e)}>
                <GreenButton
                  text='Pilih'
                  type='primary'
                  size='small'
                  roundness='square'
                />
              </div>

              <div className='w-[120px] -mt-3'
                onClick={(e) => handleResetButtonClick(e)}>
                <RedButton
                  text='Reset'
                  type='secondary'
                  size='small'
                  roundness='square'
                />
              </div>

              <div className='w-[120px] -mt-3'
                onClick={(e) => handleResetButtonClick(e)}>
                <RedButton
                  text='Batal'
                  type='primary'
                  size='small'
                  roundness='square'
                />
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default SearchBar
