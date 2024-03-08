// Components
import SearchBar from '@/components/ui/searcbar';

interface ListContainerProps {
  title: String
};

const ListContainer = (props: ListContainerProps):JSX.Element => {
  const { title } = props;
  
  return (
    <div className="w-full max-w-[641px] h-full flex justify-center bg-white rounded-t-[26px]">
      <div className='w-11/12 flex flex-col gap-6 pt-6'>
        <h1 className="text-black text-left text-2xl poppins-bold">{title}</h1>
        <SearchBar />
        <div className='overflow-y-auto flex-1 mt-5 rounded-xl'>
          <div className='w-full h-fit gap-1'>
            {/* {DataPresensi.map((data, index) => (
              <Card key={index} date={data.date} status={data.status} />
            ))}  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContainer;