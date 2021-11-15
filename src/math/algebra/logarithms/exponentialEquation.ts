import { getRandomInt } from "../../utils"
import {
  simplifyFraction,
  fractionToLatex,
} from "../../arithmetic/fractions/utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let descriptionLatex = ""
  let answers: Answers = []
  const steps: Steps = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
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
    answers = [`x = ${simplifiedFracLatex}`, `${simplifiedFracLatex}`]
  } else if (currentSkillLevel === "skilled" || currentSkillLevel === "pro") {
    const b = getRandomInt(1, 10)

    const base = 2
    const base2 = base ** base
    const exponent = getRandomInt(2, 5)
    const exponent2 = getRandomInt(2, 5)
    const c = base ** exponent
    const xCoefficient = getRandomInt(2, 10)

    descriptionLatex = `${base2}^${exponent2} \\cdot ${base}^{${xCoefficient}x + ${b}} = ${c}`

    steps.push(
      {
        math: `(${base}^${base})^${exponent2} \\cdot ${base}^{${xCoefficient}x + ${b}} = ${base}^${exponent}`,
        explanation: "Muutetaan yhtälön kantaluvut samoiksi.",
      },
      {
        math: `${base}^{${base} \\cdot ${exponent2}} \\cdot ${base}^{${xCoefficient}x + ${b}} = ${base}^${exponent} \\quad || \\enskip (a^b)^c = a^{b \\cdot c}`,
      },
      {
        math: `${base}^{${
          base * exponent2
        }} \\cdot ${base}^{${xCoefficient}x + ${b}} = ${base}^${exponent}`,
      },
      {
        math: `${base}^{ ${
          base * exponent2
        } + ${xCoefficient}x + ${b}} = ${base}^${exponent} \\quad || \\enskip a^b \\cdot a^c = a^{b + c} `,
      },

      {
        math: `${base}^{ ${xCoefficient}x + ${
          b + base * exponent2
        } } = ${base}^${exponent} `,
      },
      {
        math: `${xCoefficient}x + ${b + base * exponent2} = ${exponent} `,
        explanation:
          "Kun yhtälön kaikki kantaluvut ovat samat, voidaan yhtälö ratkaista ilmankin logaritmiä. " +
          "Päädyt samaan lopputulokseen logaritmin kanssa. Tee niinkuin tykkäät.",
      },
      {
        math: ` ${xCoefficient}x = ${exponent} - ${b + base * exponent2} `,
      },
      {
        math: `x = \\frac{${
          exponent - (b + base * exponent2)
        }}{${xCoefficient}} `,
      }
    )

    const simplifiedFrac = simplifyFraction(
      {
        numerator: exponent - (b + base * exponent2),
        denominator: xCoefficient,
      },
      steps
    )

    const simplifiedFracLatex = fractionToLatex(simplifiedFrac)
    answers = [`x = ${simplifiedFracLatex}`, `${simplifiedFracLatex}`]
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
