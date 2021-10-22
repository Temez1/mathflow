export interface Term {
  coefficient: number
  variable: string
  exponent: number
}

export const coefficientIsZero = (term: Term, steps: Steps): boolean => {
  if (term.coefficient === 0) {
    steps.push({
      math: `=0`,
    })
    return true
  }
  return false
}

export const coefficientIsOne = (term: Term, steps: Steps): boolean => {
  if (term.coefficient === 1) {
    steps.push({
      math: `=${term.variable}^${term.exponent}`,
    })
    return true
  }
  return false
}

export const exponentIsZero = (term: Term, steps: Steps): boolean => {
  if (term.exponent === 0) {
    steps.push({
      math: `=1`,
    })
    return true
  }
  return false
}

export const exponentIsOne = (term: Term, steps: Steps): boolean => {
  if (term.exponent === 1) {
    steps.push({
      math: `=${term.coefficient}${term.variable}`,
    })
    return true
  }
  return false
}

export const simplifyTerm = (term: Term, steps: Steps): Latex => {
  if (coefficientIsZero(term, steps)) {
    return "0"
  }

  if (coefficientIsOne(term, steps)) {
    return `${term.variable}^${term.exponent}`
  }

  if (exponentIsZero(term, steps)) {
    return `1`
  }

  if (exponentIsOne(term, steps)) {
    return `${term.coefficient}${term.variable}`
  }

  return `${term.coefficient}${term.variable}^${term.exponent}`
}
