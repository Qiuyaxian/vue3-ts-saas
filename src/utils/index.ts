export const isURL = (s:string) => {
  return /^http[s]?:\/\/.*/.test(s)
}