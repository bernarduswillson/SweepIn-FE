import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { easeInOut, motion } from 'framer-motion'

// Interfaces
import Report from '@/interface/AdminReportCard'
import MonthRange from '@/interface/MonthRange'

// Components
import DateSearchBar from '@/components/ui/DateSearchBar'
import ReportCard from '@/components/ui/AdminReportCard'
import SweepLoader from '@/components/ui/SweepLoader'
import Pagination from '@/components/ui/customPagination'

// Utils
import { date2String } from '@/utils/date'

interface ListContainerProps {
  data: Report[]
  count: number[]
  loading: boolean
  active?: 'Presensi' | 'Laporan'
}

const ListContainer = (props: ListContainerProps): JSX.Element => {
  const { data, count, loading, active } = props
  
  // Params
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = usePathname()
  const page = Number(searchParams.get('page')) || 1;
  const pageURL = url.split('/')[2]
  console.log(pageURL)

  // Name values
  const [nameValue, setNameValue] = useState<string>('');

  // Location values
  const [locationValue, setLocationValue] = useState<string>('');

  // Role values
  const [roleValue, setRoleValue] = useState<string>('');

  // Page values
  const [pageValue, setPageValue] = useState<number>(page);

  const [valueChanged, setValueChanged] = useState<boolean>(false);

  // Handle value change
  const handleValueChange = (name: 'name' | 'location' | 'role', value: string) => {
    switch (name) {
      case 'name':
        setNameValue(value);
        break;
      case 'location':
        setLocationValue(value);
        break;
      case 'role':
        setRoleValue(value);
        break;
    }
    setValueChanged(true);
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setPageValue(page);
  }

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
    setValueChanged(true);
  }

  // Reset page value
  useEffect(() => {
    setPageValue(1)
  }, [active])

  // Debounce search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const queryParams = new URLSearchParams();

      if (valueChanged) {
        setPageValue(1);
      }

      if (pageValue) queryParams.append('page', pageValue.toString());
      if (nameValue) queryParams.append('name', nameValue);
      if (locationValue) queryParams.append('location', locationValue);
      if (roleValue) queryParams.append('role', roleValue);
      if (monthRange.start && monthRange.end) {
        let startDate = new Date(monthRange.start as Date).toISOString()
        let endDate0 = new Date(monthRange.end as Date).setDate(
          (monthRange.end as Date).getDate() + 1
        )
        let endDate = new Date(endDate0).toISOString()
        queryParams.append('start_date', startDate);
        queryParams.append('end_date', endDate);
      }

      const queryString = queryParams.toString();
      const newPath = `${window.location.pathname}?${queryString}`;
      router.push(newPath);
      setValueChanged(false);

    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [pageValue, nameValue, locationValue, roleValue, monthRange]);

  // Handle search
  const handleSearch = () => {
    let startDate = new Date(monthRange.start as Date).toISOString()
    let endDate0 = new Date(monthRange.end as Date).setDate(
      (monthRange.end as Date).getDate() + 1
    )
    let endDate = new Date(endDate0).toISOString()
    router.push(`/laporan?start_date=${startDate}&end_date=${endDate}`)
  }

  return (
    <div className="w-full flex justify-center flex-grow bg-white rounded-t-[26px]">
      <div className="w-full flex flex-col gap-6 pt-6">
        <DateSearchBar
          onChange={handleDateInputOnChange}
        />

        {/* Search count result */}
        <p className="poppins-medium text-grey_text text-md">
        { (pageURL === 'presensi' || pageURL === 'laporan') && count[0] !== undefined ? `${count[0]} dari ${count[2]} hasil ditemukan` : ``}
        </p>

        <div className="w-full h-fit flex flex-col gap-2">
          <div className='flex px-3 poppins-bold'>
            <div className='w-1/4'>Nama</div>
            <div className='w-1/4'>Tanggal</div>
            <div className='w-1/4'>Foto</div>
            <div className='w-1/4'>Status</div>
          </div>
          {!loading ? (
            data &&
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
                  username={item.user.name}
                  numOfPhoto={item.images ? item.images : 0}
                  date={new Date(item.date)}
                  status={item.status}
                />
              </motion.div>
            ))
          ) : (
            <SweepLoader />
          )}
        </div>
        <Pagination page={page} totalItem={count[0]} perPage={count[1]} onChange={handlePageChange} />
      </div>
    </div>
  )
}

export default ListContainer
