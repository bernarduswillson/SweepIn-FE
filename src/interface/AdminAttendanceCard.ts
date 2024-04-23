export default interface Attendance {
    id: string
    user: {
        id: string
        name: string
    }
    date: string
    startLog: {
        id: string
        date: Date
    }[]
    endLog: {
        id: string
        date: Date
    }[]
  }
  