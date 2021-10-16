export const getRandomInt = (min: number, max: number): number => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

export const greatestCommonDivisor = (a: number, b: number): number =>
  a ? greatestCommonDivisor(b % a, a) : Math.abs(b)
