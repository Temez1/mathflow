// eslint-disable-next-line import/prefer-default-export
export const getRandomInt = (min: number, max: number): number => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}
