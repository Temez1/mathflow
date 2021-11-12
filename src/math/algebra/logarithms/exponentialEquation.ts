import { getRandomInt } from "../../utils"
import {
  simplifyFraction,
  fractionToLatex,
} from "../../arithmetic/fractions/utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let descriptionLatex = ""
  const answers: Answers = []
  const steps: Steps = []

  if (currentSkillLevel === "beginner") {
    const a = getRandomInt(1, 5)
    const b = getRandomInt(1, 10)

    const base = 2
    const exponent = getRandomInt(2, 5)
    const c = a + base ** exponent
    const xCoefficient = getRandomInt(2, 10)

    descriptionLatex = `${a} + ${base}^{${xCoefficient}x + ${b}} = ${c}`

    steps.push(
      {
        math: `${base}^{${xCoefficient}x + ${b}} = ${c} - ${a} \\quad || \\enskip -${a}`,
      },
      {
        math: `\\log_${base}(${base}^{${xCoefficient}x + ${b}}) = \\log_${base}(${
          c - a
        }) \\quad || \\enskip \\log_${base}()`,
      },
      {
        math: `${xCoefficient}x + ${b} = \\log_${base}(${
          c - a
        }) \\quad || \\enskip \\log_b(b^a)=a`,
      },
      {
        math: `${xCoefficient}x + ${b} = \\log_${base}(${base}^${exponent}) \\quad || \\enskip ${
          c - a
        } = ${base}^${exponent} `,
      },
      {
        math: `${xCoefficient}x + ${b} = ${exponent} \\quad || \\enskip \\log_b(b^a)=a`,
      },
      {
        math: `${xCoefficient}x = ${exponent} - ${b} \\quad || \\enskip -${b}`,
      },
      {
        math: `${xCoefficient}x = ${exponent - b}`,
      },
      {
        math: `x = \\frac{${exponent - b}}{${xCoefficient}}`,
      }
    )

    const simplifiedFrac = simplifyFraction(
      { numerator: exponent - b, denominator: xCoefficient },
      steps
    )

    const simplifiedFracLatex = fractionToLatex(simplifiedFrac)
    answers.push(`x = ${simplifiedFracLatex}`, `${simplifiedFracLatex}`)
  } else if (
    currentSkillLevel === "unknown" ||
    currentSkillLevel === "skilled" ||
    currentSkillLevel === "pro"
  ) {
    const a = getRandomInt(1, 5)
    const b = getRandomInt(1, 10)

    const base = 2
    const base2 = base ** base
    const exponent = getRandomInt(2, 5)
    const c = base ** exponent
    const xCoefficient = getRandomInt(2, 10)

    descriptionLatex = `${base2}^{x-${a}} + ${base}^{${xCoefficient}x + ${b}} = ${c}`

    steps.push({
      math: `\\log_${base}(${base2}^{x-${a}}) + \\log_${base}(${base}^{${xCoefficient}x + ${b}}) = \\log_${base}(${c})`,
    })
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
