export default interface Attendance {
  id: string
  date: string
  startLog: {
    id: string
  }[]
  endLog: {
    id: string
  }[]
};