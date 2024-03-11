import Log from "./Log"

export default interface Attendance {
  id: string,
  date: string,
  userId: String,
  startLog: Log[]
  endLog: Log[]
};