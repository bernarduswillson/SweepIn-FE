const parseTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}.${minutes} WIB`;
}

export default parseTime;