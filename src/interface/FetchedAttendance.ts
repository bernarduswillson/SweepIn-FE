import FetchedLog from "./FetchedLog"
import FetchedUser from "./FetchedUser"

export default interface Attendance {
  id: string,
  date: string,
  userId: String,
  user: FetchedUser,
  startLog: FetchedLog[],
  endLog: FetchedLog[]
};