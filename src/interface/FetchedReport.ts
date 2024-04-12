export default interface FetchedReport {
  id?: string
  userId: string
  date: string,
  status: string
  description: string,
  images: {
    type: string,
    data: number[],
  }[],
}