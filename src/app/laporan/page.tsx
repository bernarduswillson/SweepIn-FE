"use client"

// Components
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ListContainer from '@/components/ListContainer';

// Interfaces
import Report from '@/interface/Report';

// Data
import reportData from '@/data/reportDummy.json';

const Laporan = (): JSX.Element => {
  // Fetch data
  // TODO: Get the user id from session
  // const { data, loading } = useFetch(`/api/activity/user/65e977f9ff15a6ab52da402a`);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-blue_main">
      
      {/* Header */}
      <div className='w-11/12 max-w-[641px]'>
        <Navbar active='Laporan' />
        <Header title='Laporan' />
      </div>

      {/* Body */}
      <ListContainer title='Daftar Laporan' data={reportData as Report[]} loading={false}/>

      {/* <div className='flex justify-center'>
        <div className="h-[70vh] px-[5vw] sm:w-[85vw] w-full bg-white bottom-0 relative rounded-t-[40px] flex flex-col">
          <div className='h-fit'>
            <h1 className="text-black text-2xl py-6 font-bold">Daftar Laporan</h1>
            <SearchBar />
          </div>
          <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
            <div className='w-full h-fit gap-1'>
              {DataLaporan.map((data, index) => (
                <Card key={index} date={data.date} photo={data.photo} status={data.status} />
              ))}
            </div>
          </div>
        </div>
      </div> */}
    
    </div>
  );
};
  
export default Laporan;