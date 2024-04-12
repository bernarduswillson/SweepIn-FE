export default interface FetchedLog {
  id: string,
  date: string,
  images: {
    type: string,
    data: number[],
  }[],
  latitude: number,
  longitude: number,
  attendanceStartId: string | null,
  attendanceEndId: string | null
};

