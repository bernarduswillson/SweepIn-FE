interface HeaderProps {
  title: String
};

const Header = (props: HeaderProps):JSX.Element => {
  const { title } = props;

  const getToday = () => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();
    
    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }

  return (
    <div className='justify-end flex flex-col bottom-0 absolute'>
      <div className='mb-7'>
        <h1 className="text-white text-5xl pt-10 poppins-extrabold -mb-2">{title}</h1>
        <h2 className="text-white text-md poppins-medium">{getToday()}</h2>
      </div>
    </div>
  );
};

export default Header;