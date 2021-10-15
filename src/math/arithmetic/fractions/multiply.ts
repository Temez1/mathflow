import { getRandomInt } from "../../utils"
import {
  simplifyNonZeroFraction,
  fractionDivisionByZero,
  fractionIsZero,
} from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const description = "Ratkaise ja sievennä"
  let min = 0
  let max = 9

  let descriptionLatex = ""
  let steps: Step[] = []

  let aNumerator = getRandomInt(min, max)
  let aDenominator = getRandomInt(min, max)
  let bNumerator = getRandomInt(min, max)
  let bDenominator = getRandomInt(min, max)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    min = 1
    max = 5
    aDenominator = getRandomInt(min, max)
    bNumerator = getRandomInt(min, max)
    bDenominator = getRandomInt(min, max)
    aNumerator = getRandomInt(min, max)
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}}*\\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator}*${bNumerator}}{${aDenominator}*${bDenominator}}`,
        explanation:
          "Murtolukujen kertolaskussa molempien murtolukujen yläkerrat (osoittajat) ja alakerrat (nimittäjät) kerrotaan yhteen.",
      },
      {
        math: `=\\frac{${aNumerator * bNumerator}}{${
          aDenominator * bDenominator
        }}`,
      },
    ]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}}*\\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator}*${bNumerator}}{${aDenominator}*${bDenominator}}`,
        explanation:
          "Murtolukujen kertolaskussa molempien murtolukujen yläkerrat (osoittajat) ja alakerrat (nimittäjät) kerrotaan yhteen.",
      },
      {
        math: `=\\frac{${aNumerator * bNumerator}}{${
          aDenominator * bDenominator
        }}`,
      },
    ]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}}*\\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator}*${bNumerator}}{${aDenominator}*${bDenominator}}`,
        explanation:
          "Murtolukujen kertolaskussa molempien murtolukujen yläkerrat (osoittajat) ja alakerrat (nimittäjät) kerrotaan yhteen.",
      },
      {
        math: `=\\frac{${aNumerator * bNumerator}}{${
          aDenominator * bDenominator
        }}`,
      },
    ]
  } else if (currentSkillLevel === "expert") {
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}}*\\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator}*${bNumerator}}{${aDenominator}*${bDenominator}}`,
        explanation:
          "Murtolukujen kertolaskussa molempien murtolukujen yläkerrat (osoittajat) ja alakerrat (nimittäjät) kerrotaan yhteen.",
      },
      {
        math: `=\\frac{${aNumerator * bNumerator}}{${
          aDenominator * bDenominator
        }}`,
      },
    ]
  }

  const numeratorResult = aNumerator * bNumerator
  const denominatorResult = aDenominator * bDenominator

  if (
    fractionIsZero(
      { numerator: numeratorResult, denominator: denominatorResult },
      steps
    )
  ) {
    const answers = [`0`]
    return {
      description,
      descriptionLatex,
      steps,
      answers,
    }
  }

  if (fractionDivisionByZero(denominatorResult, steps)) {
    const answers = undefined
    return {
      description,
      descriptionLatex,
      steps,
      answers,
    }
  }

  const simplifiedFraction = simplifyNonZeroFraction(
    {
      numerator: numeratorResult,
      denominator: denominatorResult,
    },
    steps
  )

  if (typeof simplifiedFraction === "number") {
    const answers = [`${simplifiedFraction}`]
    return {
      description,
      descriptionLatex,
      steps,
      answers,
    }
  }

  const answers = [
    `\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
  ]

  return {
    description,
    descriptionLatex,
    steps,
    answers,
  }
}
