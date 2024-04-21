export default interface LogForm {
  userId?: string
  attendanceId?: string
  id?: string
  date: string
  image?: File
  imageSrc?: string
  latitude: number
  longitude: number
  attendanceStartId?: string
  attendanceEndId?: string
}
