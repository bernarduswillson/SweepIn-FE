import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { easeInOut, motion } from 'framer-motion';

// Interfaces
import MonthRange from '@/interface/data/MonthRange';
import Attendance from '@/interface/AttendanceCard';

// Components
import DateSearchBar from '@/components/inputs/DateSearchBar';
import AttendanceCard from '@/components/ui/AttendanceCard';
import SweepLoader from '@/components/loaders/SweepLoader';

interface AttendanceListContainerProps {
  data: Attendance[],
  loading: boolean
};

const AttendanceListContainer = (props: AttendanceListContainerProps): JSX.Element => {
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
      router.push(`/presensi`)
    }

    if (monthRange.start && monthRange.end) {
      let startDate = new Date(monthRange.start as Date).toISOString()
      let endDate0 = new Date(monthRange.end as Date).setDate(
        (monthRange.end as Date).getDate() + 1
      )
      let endDate = new Date(endDate0).toISOString()
      router.push(`/presensi?start_date=${startDate}&end_date=${endDate}`)
    }
  }, [monthRange])

  return (
    <div className="w-full max-w-[641px] flex justify-center flex-grow bg-surface rounded-t-[24px]">
      <div className="w-11/12 flex flex-col gap-4 pt-3">
        <h1 className="text-neutral-900 text-left header-2">
          Daftar Presensi
        </h1>

        <DateSearchBar
          onChange={handleDateInputOnChange}
        />

        <div className="w-full h-fit flex flex-col items-center gap-1 pb-[100px]">
          {!loading ? (
            data && data.length > 0 ?
            data.map((item: Attendance, index: number) => (
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
                <AttendanceCard
                  id={item.id}
                  date={new Date(item.date)}
                  startAttendanceId={item?.startLog?.[0]?.id as string}
                  endAttendanceId={item?.endLog?.[0]?.id as string}
                />
              </motion.div>
            )) : (
              <div className='py-4'>
                <p className='body-m text-neutral-400'>Belum ada presensi</p>
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

export default AttendanceListContainer;
