export const truncate = (original: string, options?: {
  length?: number,
  separator?: string
}) => {

  const { length = 5, separator = "..." } = options || {}

  const strLength = original.length;

  if (original.includes('.')) return original

  if ((strLength - length) < length) {
    return original
  }

  const firstCountLetter = original.slice(0, length);
  const lastCountLetter = original.slice(strLength - length, strLength);

  return `${firstCountLetter}${typeof separator === "string" ? separator : '...'}${lastCountLetter}`
}