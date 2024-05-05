export default interface FetchedReport {
  id: string
  user: {
    id: string
    name: string
  }
  date: string
  status: string
  images: number
}
