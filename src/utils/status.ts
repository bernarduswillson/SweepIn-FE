/***
 * Parse report status to formatted string
 * undefined: belum dikirim
 * WAITING: diproses
 * REJECTED: ditolak
 * ACCEPTED: diterima
 */
const parseStatus = (status: string): string => {
  switch (status) {
    case 'WAITING':
      return 'diproses'
    case 'REJECTED':
      return 'ditolak'
    case 'ACCEPTED':
      return 'diterima'
    default:
      return 'belum dikirim'
  }
}

export { parseStatus }
