import { getRandomInt } from "../../utils"
import { simplifyFraction } from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const description = "Ratkaise ja sievennä"
  let min = 0
  let max = 9

  let descriptionLatex = ""
  let steps: Steps = []

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
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} \\cdot \\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator} \\cdot ${bNumerator}}{${aDenominator} \\cdot ${bDenominator}}`,
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
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} \\cdot \\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator} \\cdot ${bNumerator}}{${aDenominator} \\cdot ${bDenominator}}`,
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
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} \\cdot \\frac{${bNumerator}}{${bDenominator}}`

    steps = [
      {
        math: `=\\frac{${aNumerator} \\cdot ${bNumerator}}{${aDenominator} \\cdot ${bDenominator}}`,
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

  const simplifiedFraction = simplifyFraction(
    {
      numerator: numeratorResult,
      denominator: denominatorResult,
    },
    steps
  )

  if (simplifiedFraction === undefined) {
    const answers = undefined
    return {
      description,
      descriptionLatex,
      steps,
      answers,
    }
  }

  if (typeof simplifiedFraction === "number") {
    const answers = [`${simplifiedFraction}`]
    return {
      description,
      descriptionLatex,
      steps,
      answers,
    }
  }

  let answers = []
  if (simplifiedFraction.sign === "-") {
    answers = [
      `-\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    ]
  } else {
    answers = [
      `\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    ]
  }

  return {
    description,
    descriptionLatex,
    steps,
    answers,
  }
}
