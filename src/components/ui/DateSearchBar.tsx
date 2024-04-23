import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

// Asset
import Icon from '@public/icons/calendar-ic.svg'

// Components
import { Calendar } from '@/components/ui/calendar'
import Button from '@/components/ui/button'

interface SearchBarProps {
  onChange: (name: 'start' | 'end', value: Date | undefined) => void
  onSearch: () => void
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { onChange, onSearch } = props

  // Show calendar form
  const [showCalendar, setShowCalendar] = useState(false)

  // Date values
  const [date, setDate] = useState<DateRange | undefined>()

  // Validation
  const [isValid, setIsValid] = useState<Boolean>(false)

  // Handle change date value
  useEffect(() => {
    const dateFrom = date?.from
    const dateTo = date?.to
    
    onChange('start', dateFrom)
    onChange('end', dateTo)
  }, [date])

  // Handle select date
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const dateFrom = date?.from
    const dateTo = date?.to

    setIsValid(true)
    onChange('start', dateFrom)
    onChange('end', dateTo)
    setShowCalendar(false)
  }

  // Handle reset date
  const handleRestButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDate(undefined)
    setIsValid(false)
    setShowCalendar(false)
  }

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
        className={`w-[80%] flex justify-between items-center py-1 px-2 pl-3 border-grey border-2 rounded-xl poppins-medium ${date && isValid ? 'text-black' : 'text-grey_text'}`}
        onClick={() => setShowCalendar(true)}
      >
        {date && isValid? `${convertDateToString(date.from as Date)} - ${convertDateToString(date.to as Date)}` : 'Pilih Tanggal'}

        {/* Calendar icon */}
        <Image src={Icon} alt="Calendar" width={25} />

        {/* Calendar form */}
        {showCalendar && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
              onClick={handleButtonClick}
            ></div>
            <div className="fixed top-1/2 left-1/2 flex flex-col py-5 px-5 items-center gap-5 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-md border shadow">
              <div className="text-black poppins-bold">Pilih Tanggal Mulai</div>
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
                <Button text="Pilih" color="green" />
              </button>
              <button
                className="-mt-2"
                onClick={(e) => handleRestButtonClick(e)}
              >
                <Button text="Reset Tanggal" color="blue" />
              </button>
            </div>
          </>
        )}
      </button>

      {/* Cari */}
      <div className="w-[20%]">
        <Button
          text="Cari"
          color="green"
          disable={!isValid}
          onClick={onSearch}
        />
      </div>
    </div>
  )
}

export default SearchBar
