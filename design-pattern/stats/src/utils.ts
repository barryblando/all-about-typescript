export const dateStringToDate = (dateString: string): Date => {
  // 28/10/2018
  const [Day, Month, Year] = dateString
    .split('/')
    .map((value: string): number => parseInt(value))

  return new Date(Year, Month - 1, Day)
}