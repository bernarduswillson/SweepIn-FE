// Components
import LogDetails from '@/components/LogDetails';

// Interface
import Attendance from '@/interface/FetchedAttendance';

interface AttendanceDetailsProps {
  data: Attendance
  loading: boolean
}

const AttendanceDetails = (props: AttendanceDetailsProps): JSX.Element => {
  const { data, loading } = props;

  if (loading) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div className=''>
      <h2 className='poppins-extrabold text-lg mb-2'>User</h2>
      {/* Name */}
      <h3 className="poppins-bold text-blue_main mb-10">{data.user.name}</h3>

      {/* Presensi */}
      <div className='w-full flex'>
        <div className='w-1/2'>
          <h2 className='poppins-extrabold text-lg mb-5'>Presensi Awal</h2>
          <LogDetails data={data.startLog} />
        </div>
        <div className='w-1/2'>
          <h2 className='poppins-extrabold text-lg mb-5'>Presensi Akhir</h2>
          <LogDetails data={data.endLog} />
        </div>
      </div>
    </div>
  );
}

export default AttendanceDetails;