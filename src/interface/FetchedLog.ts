export default interface FetchedLog {
  id: string,
  date: string,
  image: string,
  latitude: number,
  longitude: number,
  attendanceStartId: string | null,
  attendanceEndId: string | null
};

