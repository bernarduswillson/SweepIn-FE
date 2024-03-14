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

/*** Parse date time range to String (HH:MM-HH:MM WIB) */ 
const dateTimeRange2String = (startDate: Date, endDate: Date | null): string => {
  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const str1 = `${startHours < 10 ? `0${startHours}` : startHours}.${startMinutes < 10 ? `0${startMinutes}` : startMinutes}`;
  if (!endDate) {
    return `${str1} WIB`
  }
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  const str2 = `${endHours < 10 ? `0${endHours}` : endHours}.${endMinutes < 10 ? `0${endMinutes}` : endMinutes}`;
  return `${str1} - ${str2} WIB`
}

export { getTodayDate, date2String, dateTime2String, dateTimeRange2String };