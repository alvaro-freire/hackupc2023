export const trimToLength = (text: string, size: number = 15): string => {
  return text.length > size
    ? `${text.slice(0, size)}...`
    : text
}
