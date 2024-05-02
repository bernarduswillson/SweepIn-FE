import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { easeInOut, motion } from 'framer-motion'

// Interfaces
import Report from '@/interface/ReportCard'
import MonthRange from '@/interface/data/MonthRange'

// Components
import DateSearchBar from '@/components/inputs/DateSearchBar'
import ReportCard from '@/components/card/ReportCard'
import SweepLoader from '@/components/loaders/SweepLoader'

// Utils
import { date2String } from '@/utils/date'

interface ListContainerProps {
  data: Report[]
  loading: boolean
}

const ListContainer = (props: ListContainerProps): JSX.Element => {
  const { data, loading } = props
  const router = useRouter()

  // Month range value
  const [monthRange, setMonthRange] = useState<MonthRange>({
    start: undefined,
    end: undefined
  })

  // Handle change date input
  const handleDateInputOnChange = (
    name: 'start' | 'end',
    value: Date | undefined
  ) => {
    setMonthRange((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Set params
  useEffect(() => {
    if (!monthRange.start && !monthRange.end) {
      router.push(`/laporan`)
    }

    // if monthrange is defined
    if (monthRange.start && monthRange.end) {
      let startDate = new Date(monthRange.start as Date).toISOString()
      let endDate0 = new Date(monthRange.end as Date).setDate(
        (monthRange.end as Date).getDate() + 1
      )
      let endDate = new Date(endDate0).toISOString()
      router.push(`/laporan?start_date=${startDate}&end_date=${endDate}`)
    }
  }, [monthRange])

  return (
    <div className="w-full max-w-[641px] flex justify-center flex-grow bg-surface rounded-t-[24px]">
      <div className="w-11/12 flex flex-col gap-4 pt-3">
        <h1 className="text-neutral-900 text-left header-2">
          Daftar Laporan
        </h1>

        <DateSearchBar
          onChange={handleDateInputOnChange}
        />

        <div className="w-full h-fit flex flex-col items-center gap-1 pb-[100px]">
          {!loading ? (
            data && data.length > 0 ?
            data.map((item: Report, index: number) => (
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
                viewport={{ once: true }}
                className="w-full"
              >
                <ReportCard
                  id={item.id as string}
                  numOfPhoto={item.images ? item.images : 0}
                  date={new Date(item.date)}
                  status={item.status}
                />
              </motion.div>
            )) : (
              <div className='py-4'>
                <p className='body-m text-neutral-400'>Belum ada laporan</p>
              </div>
            )
          ) : (
            <SweepLoader />
          )}
        </div>
      </div>
    </div>
  )
}

export default ListContainer
