import { getRandomInt } from "../../utils"
import { simplifyFraction } from "../../arithmetic/fractions/utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  let a = getRandomInt(2, 10)
  const b = getRandomInt(1, 10)
  const c = getRandomInt(1, 10)
  const d = getRandomInt(2, 10)

  let numeratorResult = 0
  let denominatorResult = 0

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `${a}x+${b}=${c}`

    steps.push(
      {
        math: `${a}x+${b}-${b}=${c}-${b}`,
        explanation: `Vähennetään yhtälön molemmilta puolilta ${b}`,
      },
      {
        math: `${a}x=${c}-${b}`,
        explanation: `Vähentämällä ${b} molemmilta puolilta onnistutaan eliminoimaan ${b} vasemmalta puolelta.`,
      },
      {
        math: `${a}x=${c - b}`,
      },
      {
        math: `\\frac{${a}x}{${a}}=\\frac{${c - b}}{${a}}`,
        explanation: `Jaetaan molemmat puolet ${a}:lla `,
      },
      {
        math: `1x=\\frac{${c - b}}{${a}}`,
      }
    )
    numeratorResult = c - b
    denominatorResult = a
  } else if (currentSkillLevel === "skilled") {
    const coefficient = a - c
    // TODO#67
    // See https://github.com/Temez1/mathflow/issues/67
    if (coefficient === 0) {
      a = c + 1
    }

    // Avoid divide by 1 when coefficient is 1 or 0.
    // To simplify logic needed.
    if (Math.abs(coefficient) < 2) {
      a = c + 2
    }

    descriptionLatex = `${a}x+${b}=${c}x-${d}`

    steps.push(
      {
        math: `${a}x-${c}x+${b}=${c}x-${c}x${-d}`,
        explanation: `Vähennetään yhtälön molemmilta puolilta ${c}x`,
      },
      {
        math: `${a - c}x+${b}=${-d}`,
      },
      {
        math: `${a - c}x+${b}-${b}=${-d}${-b}`,
        explanation: `Vähennetään yhtälön molemmilta puolilta ${b}`,
      },
      {
        math: `${a - c}x=${-d - b}`,
      },
      {
        math: `\\frac{${a - c}x}{${a - c}}=\\frac{${-d - b}}{${a - c}}`,
        explanation: `Jaetaan molemmat puolet ${a - c}:lla `,
      },
      {
        math: `1x=\\frac{${-d - b}}{${a - c}}`,
      }
    )

    numeratorResult = -d - b
    denominatorResult = a - c
  } else if (currentSkillLevel === "pro") {
    const coefficient = a - c
    // TODO#67
    // See https://github.com/Temez1/mathflow/issues/67
    if (coefficient === 0) {
      a = c + 1
    }

    // Avoid divide by 1 when coefficient is 1. To simplify logic needed.
    if (Math.abs(coefficient) < 2) {
      a = c + 2
    }

    descriptionLatex = `${a}x+${b}=${c}x-${d}`

    steps.push(
      {
        math: `${a}x-${c}x+${b}=${c}x-${c}x${-d}`,
        explanation: `Vähennetään yhtälön molemmilta puolilta ${c}x`,
      },
      {
        math: `${a - c}x+${b}=${-d}`,
      },
      {
        math: `${a - c}x+${b}-${b}=${-d}${-b}`,
        explanation: `Vähennetään yhtälön molemmilta puolilta ${b}`,
      },
      {
        math: `${a - c}x=${-d - b}`,
      },

      {
        math: `\\frac{${a - c}x}{${a - c}}=\\frac{${-d - b}}{${a - c}}`,
        explanation: `Jaetaan molemmat puolet ${a - c}:lla `,
      },
      {
        math: `1x=\\frac{${-d - b}}{${a - c}}`,
      }
    )

    numeratorResult = -d - b
    denominatorResult = a - c
  }

  const simplifiedFraction = simplifyFraction(
    { numerator: numeratorResult, denominator: denominatorResult },
    steps
  )

  if (simplifiedFraction === undefined) {
    answers = undefined
  } else if (typeof simplifiedFraction === "number") {
    steps.push({
      math: `x=${simplifiedFraction}`,
    })
    answers = [`x=${simplifiedFraction}`, `${simplifiedFraction}`]
  } else if (simplifiedFraction.sign === "-") {
    steps.push({
      math: `x=-\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    })
    answers = [
      `x=-\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
      `-\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    ]
  } else {
    steps.push({
      math: `x=\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    })
    answers = [
      `x=\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
      `\\frac{${simplifiedFraction.numerator}}{${simplifiedFraction.denominator}}`,
    ]
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
