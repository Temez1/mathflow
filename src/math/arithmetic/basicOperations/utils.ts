// eslint-disable-next-line import/prefer-default-export
export const divisionByZero = (denominator: number, steps: Steps): boolean => {
  if (denominator === 0) {
    steps.push({
      math: `=määrittelemätön`,
      explanation: "Nollalla jakamista ei ole määritelty",
    })
    return true
  }
  return false
}
