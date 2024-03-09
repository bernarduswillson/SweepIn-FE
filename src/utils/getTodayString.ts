const getToday = (withDay: boolean = false): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  
  const dayName = days[today.getDay()];
  const monthName = months[monthIndex];

  return `${withDay ? `${dayName}, ` : ''} ${day} ${monthName} ${year}`;
}

export default getToday;