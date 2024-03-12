export default interface Log {
  id?: string,
  date: string,
  image?: File,
  imageSrc?: string,
  latitude: number,
  longitude: number,
  attendanceStartId?: string,
  attendanceEndId?: string
};

