import { getRandomInt } from "../../utils"
import {
  expandFractionsToHaveSameDenominator,
  Fraction,
  simplifyFraction,
} from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const description = "Ratkaise ja sievennä"
  let min = 1
  let max = 9

  let descriptionLatex = ""
  let steps: Steps = []

  let aNumerator = getRandomInt(min, max)
  let aDenominator = getRandomInt(min, max)
  let bNumerator = getRandomInt(min, max)
  let bDenominator = getRandomInt(min, max)

  let fractionA: Fraction = {
    numerator: aNumerator,
    denominator: aDenominator,
  }
  let fractionB: Fraction = {
    numerator: bNumerator,
    denominator: bDenominator,
  }

  let { expandedFractionA, expandedFractionB } =
    expandFractionsToHaveSameDenominator(fractionA, fractionB, "+", steps)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    steps = []
    min = 1
    max = 5
    aDenominator = getRandomInt(min, max)
    bNumerator = getRandomInt(min, max)
    bDenominator = getRandomInt(min, max)
    aNumerator = getRandomInt(min, max)
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} + \\frac{${bNumerator}}{${bDenominator}}`

    fractionA = {
      numerator: aNumerator,
      denominator: aDenominator,
    }

    fractionB = {
      numerator: bNumerator,
      denominator: bDenominator,
    }
    ;({ expandedFractionA, expandedFractionB } =
      expandFractionsToHaveSameDenominator(fractionA, fractionB, "+", steps))

    steps.push(
      {
        math: `=\\frac{${expandedFractionA.numerator}+${expandedFractionB.numerator}}{${expandedFractionA.denominator}}`,
        explanation:
          "Murtolukujen yhteenlasku tapahtuu laskemalla yläkerrat (osoittajat) yhteen.",
      },
      {
        math: `=\\frac{${
          expandedFractionA.numerator + expandedFractionB.numerator
        }}{${expandedFractionA.denominator}}`,
      }
    )
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} + \\frac{${bNumerator}}{${bDenominator}}`

    steps.push(
      {
        math: `=\\frac{${expandedFractionA.numerator}+${expandedFractionB.numerator}}{${expandedFractionA.denominator}}`,
        explanation:
          "Murtolukujen yhteenlasku tapahtuu laskemalla yläkerrat (osoittajat) yhteen.",
      },
      {
        math: `=\\frac{${
          expandedFractionA.numerator + expandedFractionB.numerator
        }}{${expandedFractionA.denominator}}`,
      }
    )
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `\\frac{${aNumerator}}{${aDenominator}} + \\frac{${bNumerator}}{${bDenominator}}`

    steps.push(
      {
        math: `=\\frac{${expandedFractionA.numerator}+${expandedFractionB.numerator}}{${expandedFractionA.denominator}}`,
        explanation:
          "Murtolukujen yhteenlasku tapahtuu laskemalla yläkerrat (osoittajat) yhteen.",
      },
      {
        math: `=\\frac{${
          expandedFractionA.numerator + expandedFractionB.numerator
        }}{${expandedFractionA.denominator}}`,
      }
    )
  }

  const numeratorResult =
    expandedFractionA.numerator + expandedFractionB.numerator
  const denominatorResult = expandedFractionA.denominator

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
