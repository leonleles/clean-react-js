export const makeApiURL = (path: string): string => {
  return `${process.env.API_URL}${path}`
}
