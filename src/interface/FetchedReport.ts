import FetchedUser from "./FetchedUser"

export default interface FetchedReport {
  id?: string
  user?: FetchedUser
  userId: string
  date: string,
  status: string
  description: string,
  images: {
    type: string,
    data: number[],
  }[],
}