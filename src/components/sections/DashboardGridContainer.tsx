import Overview from "../card/AdminOverviewCard"
import AdminStatisticCard from "../card/AdminStatisticCard"
import AttendanceIcon from "../icons/AttendanceIcon"
import ReportIcon from "../icons/ReportIcon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const GridContainer = () : JSX.Element => {
    return (
        <div className="space-y-4">
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {/* TODO:
                    - icon to distinguish `presensi awal` and `presensi akhir`
                    - get value and percentage from db
                 */}
                <AdminStatisticCard 
                    title="Presensi Awal"
                    icon={<AttendanceIcon width="2rem" />}
                    value={1000}
                    percentage={10}
                />
                <AdminStatisticCard 
                    title="Presensi Akhir"
                    icon={<AttendanceIcon width="2rem" />}
                    value={1000}
                    percentage={-10}
                />
                <AdminStatisticCard 
                    title="Laporan Masuk"
                    icon={<ReportIcon width="2rem" />}
                    value={1000}
                    percentage={10}
                />

                {/* TODO: make this card as a clock */}
                <AdminStatisticCard />
            </div>

            <div className='grid gap-4 grid-cols-2 lg:grid-cols-7'>
                {/* TODO: get data to visualize */}
                <Card className='col-span-1 md:col-span-4'>
                    <CardHeader>
                        <CardTitle className='poppins-extrabold text-primary-500'>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>
                        <Overview />
                    </CardContent>
                </Card>

                {/* TODO: card for showing recent report */}
                <Card className='col-span-1 md:col-span-3'>
                    <CardHeader>
                        <CardTitle className='poppins-extrabold text-primary-500'>
                            Laporan Terkini
                        </CardTitle>
                        <CardDescription className='poppins-regular text-neutral-900'>
                            Ada 500 laporan menunggu untuk disetujui
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default GridContainer;