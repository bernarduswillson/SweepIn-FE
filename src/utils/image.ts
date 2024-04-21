const bufferToBase64 = (buffer: number[]): string => {
  // Convert the array of numbers to a Buffer
  const bufferData = Buffer.from(buffer)

  // Convert the Buffer to a Base64 string
  const base64String = bufferData.toString('base64')

  return base64String
}

export default bufferToBase64
