export default interface Log {
  userId: string,
  photo: string,
  time: Date | undefined,
  lat: number | undefined,
  long: number | undefined,
};