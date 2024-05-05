import Header from '@/components/AdminHeader';
import BlueButton from '@/components/buttons/BlueButton';
import GridContainer from '@/components/sections/DashboardGridContainer';
import FetchedCount from '@/interface/FetchedCount';
import User from '@/interface/User';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Report from '@/interface/AdminReportCard';
import SimpleReportCardProps from '@/interface/SimpleReportCard';

const DashboardPage = (): JSX.Element => {
    const { data: session } = useSession()

    // Query params
    const searchParams = useSearchParams()

    // Location search
    const location = searchParams.get('location') || ''

    // Role search
    const role = searchParams.get('role') || ''

    // User data
    const [user, setUser] = useState<User | null>(null)

    // Fetch data
    const [report, setReport] = useState<SimpleReportCardProps[]>([])
    const [waiting, setWaiting] = useState<number>(0)
    const [count, setCount] = useState<FetchedCount[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    // Set user data from session
    useEffect(() => {
        if (session) {
        setUser(session.user as User)
        }
    }, [session])

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (user?.id) {
                const locationValue = location && location != 'Semua Lokasi'
                const roleValue = role && role != 'Semua Role'
                const ampersandAvailable = (locationValue && roleValue) ? '&' : ''
                try {
                    const responseAttendance = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/attendance/count?${locationValue ? `location=${location}` : ''}${ampersandAvailable}${roleValue ? `role=${role}` : ''}`
                    )

                    const responseReport = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/report/count?${locationValue ? `location=${location}` : ''}${ampersandAvailable}${roleValue ? `role=${role}` : ''}`
                    )

                    const combinedCount: FetchedCount[] = []
                    for (const dateString of Object.keys(responseReport.data.data)) {

                        combinedCount.push({
                            date: dateString,
                            PresensiAwal: responseAttendance.data.data.countStartLog[dateString],
                            PresensiAkhir: responseAttendance.data.data.countEndLog[dateString],
                            Laporan: responseReport.data.data[dateString]
                        })
                    }
                    setCount(combinedCount)

                } catch (error) {
                    console.error(error)
                    setCount([])
                }

                try {
                    const responseReportCard = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/report?page=1&per_page=5${locationValue ? `&location=${location}` : ''}${roleValue ? `&role=${role}` : ''}&status=WAITING`
                    )
                    setReport(responseReportCard.data.data.reports.map((report: Report) => ({
                        id: report.id,
                        username: report.user.name,
                        date: new Date(report.date)
                    })))
                    setWaiting(responseReportCard.data.data.filtered)
                } catch (error) {
                    console.error(error)
                    setReport([])
                    setWaiting(0)
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [location, role, user?.id])

    return (
        <div className="w-full flex flex-col items-center bg-white">
            <div className="w-11/12">

                {/* Header */}
                <div className='flex justify-between items-center'>
                    <Header title="Dashboard"/>
                </div>

                {/* Body */}
                <GridContainer
                    data={count}
                    waiting={waiting}
                    report={report}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default DashboardPage;