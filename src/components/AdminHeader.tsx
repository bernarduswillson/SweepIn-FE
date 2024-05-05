import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'

// Utils
import { date2String, getTodayDate } from '@/utils/date'

interface HeaderProps {
  title: String
}

const Header = (props: HeaderProps): JSX.Element => {
  const { title } = props

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="relative h-fit flex flex-col justify-end">
      <div className="relative h-fit flex flex-col justify-end">
        <div className="mb-7 transition ease-in-out duration-500">
          <h1
            ref={ref}
            className={`text-blue_main text-5xl pt-10 poppins-extrabold transition ease-in-out duration-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
          >
            {title}
          </h1>
          <h2
            ref={ref}
            className={`text-black text-md poppins-medium transition ease-in-out duration-500 delay-200 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
          >
            {date2String(getTodayDate(), false)}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Header
