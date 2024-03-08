export default interface Attendance {
  id: string,
  date: string,
  startLogId: string | null,
  endLogId: string | null
};