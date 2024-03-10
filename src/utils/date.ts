/*** Get today date as Date */ 
const getTodayDate = (): Date => {
  return new Date();
};

/*** 
 * Parse date to String
 * If withDay is true (DAY, DD MONTH, YYYY) 
 * If withDay is false (DD MONTH, YYYY) 
 */ 
const date2String = (date: Date, withDay: boolean = true): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  if (withDay) {
    const day = days[date.getDay()];
    return `${day}, ${date.getDate()} ${month} ${year}`;
  } else {
    return `${date.getDate()} ${month} ${year}`
  }
};

/*** Parse date time to String (HH:MM WIB) */ 
const dateTime2String = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}.${minutes < 10 ? `0${minutes}` : minutes} WIB`;
}

export { getTodayDate, date2String, dateTime2String };