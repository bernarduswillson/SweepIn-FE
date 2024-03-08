export default interface Attendance {
  id: string,
  userId: string,
  date: string,
  startAttendanceId: string | null,
  endAttendanceId: string | null
};