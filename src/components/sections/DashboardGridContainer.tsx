import AdminStatisticCard from "../card/AdminStatisticCard"
import AttendanceIcon from "../icons/AttendanceIcon"
import ReportIcon from "../icons/ReportIcon"
import SimpleReportCard from "@/components/card/AdminSimpleReportCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import FetchedCount from '../../interface/FetchedCount';
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import FilterBar from "../inputs/UserFilterBar"
import OverviewCard from "../card/AdminOverviewCard"
import SweepLoader from "../loaders/SweepLoader";
import { easeInOut, motion } from "framer-motion";
import SimpleReportCardProps from "@/interface/SimpleReportCard"
import BlueButton from "../buttons/BlueButton"

interface GridContainerProps {
    data: FetchedCount[],
    waiting: number,
    report: SimpleReportCardProps[],
    loading: boolean
}

const GridContainer = (props: GridContainerProps) : JSX.Element => {
    const { data, waiting, report, loading } = props

    // Params
    const router = useRouter();

    // Location values
    const [locationValue, setLocationValue] = useState<string>('');
    
    // Role values
    const [roleValue, setRoleValue] = useState<string>('');

    // Handle value change
    const handleValueChange = (name: 'location' | 'role', value: string) => {
        switch (name) {
        case 'location':
            setLocationValue(value);
            break;
        case 'role':
            setRoleValue(value);
            break;
        }
    }

    // debounce search
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const queryParams = new URLSearchParams();

            if (locationValue) queryParams.append('location', locationValue);
            if (roleValue) queryParams.append('role', roleValue);

            const queryString = queryParams.toString();
            const newPath = `${window.location.pathname}?${queryString}`;
            router.push(newPath);
            
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [locationValue, roleValue]);

    const percentageStart = (data[0]?.PresensiAwal - data[1]?.PresensiAwal)/data[1]?.PresensiAwal * 100
    const percentageEnd = (data[0]?.PresensiAkhir - data[1]?.PresensiAkhir)/data[1]?.PresensiAkhir * 100
    const percentageReport = (data[0]?.Laporan - data[1]?.Laporan)/data[1]?.Laporan * 100

    return (
        <div className='pt-6'>
            <FilterBar 
                location={locationValue}
                role={roleValue}
                onChange={handleValueChange}
            />
            <div className="space-y-4">
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <AdminStatisticCard 
                        title="Presensi Awal"
                        icon={<AttendanceIcon width="2rem" />}
                        value={data[0]?.PresensiAwal}
                        percentage={percentageStart === Infinity ? 100 : percentageStart || 0}
                    />
                    <AdminStatisticCard 
                        title="Presensi Akhir"
                        icon={<AttendanceIcon width="2rem" />}
                        value={data[0]?.PresensiAkhir}
                        percentage={percentageEnd === Infinity ? 100 : percentageEnd || 0}
                    />
                    <AdminStatisticCard 
                        title="Laporan Masuk"
                        icon={<ReportIcon width="2rem" />}
                        value={data[0]?.Laporan}
                        percentage={percentageReport === Infinity ? 100 : percentageReport || 0}
                    />
                </div>

                <motion.div
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
                    viewport={{once: true}}  
                    className='w-full'
                >
                    <div className='grid gap-4 grid-cols-2 lg:grid-cols-7'>
                        {/* TODO: get data to visualize */}
                        <Card className='col-span-1 md:col-span-4'>
                            <CardHeader>
                                <CardTitle className='poppins-extrabold text-primary-500'>
                                    Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='pl-2'>
                                {!loading ? (
                                    data && (
                                        <OverviewCard 
                                            data={ data.toReversed() }
                                        />
                                    )
                                ) : (
                                    <SweepLoader />
                                )}
                            </CardContent>
                        </Card>

                        {/* TODO: card for showing recent report */}
                        <Card className='col-span-1 md:col-span-3'>
                            <CardHeader>
                                <CardTitle className='poppins-extrabold text-primary-500'>
                                    Laporan Terkini
                                </CardTitle>
                                <CardDescription className='poppins-regular text-neutral-900'>
                                    Ada <span className='poppins-bold'>{waiting} laporan</span> yang belum diproses
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                {!loading ? (
                                    report?.map((item: SimpleReportCardProps) => (
                                        <motion.div
                                            key={item.id}
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
                                            <SimpleReportCard 
                                                id={item.id}
                                                username={item.username}
                                                date={item.date}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <SweepLoader />
                                )}
                            </CardContent>
                            <CardFooter>
                                <motion.div
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
                                    <BlueButton
                                        text="Lihat Semua"
                                        type="primary"
                                        size="small"
                                        roundness="square"
                                        onClick={() => router.push('/admin/laporan')}
                                    />
                                </motion.div>
                            </CardFooter>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default GridContainer;