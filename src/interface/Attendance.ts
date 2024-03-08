export default interface Attendance {
  id: string,
  createdAt: string,
  startLogId: string | null,
  endLogId: string | null
};