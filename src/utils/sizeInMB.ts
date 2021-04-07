export const sizeInMB = (size: number) => {
  return parseFloat((size / (1024 * 1024)).toFixed(2))
}
