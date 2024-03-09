// Parse date to String (DAY, DD MONTH YYYY)
const parseDate = (date: Date): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${date.getDate()} ${month} ${year}`;
};

export default parseDate;