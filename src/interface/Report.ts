export default interface Report {
  id: string
  numOfPhoto: number,
  date: string,
  status: 'belum dikirim' | 'diproses' | 'diterima' | 'ditolak'
}