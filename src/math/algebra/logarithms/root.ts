import { getRandomInt } from "../../utils"
import {
  simplifyFraction,
  fractionToLatex,
} from "../../arithmetic/fractions/utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []

  let description = ""
  let descriptionLatex = ""
  let answers: Answers = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    description = "Ratkaise"
    const base = 2
    const exponent = 2 * getRandomInt(1, 3)
    const antiLog = base ** exponent

    descriptionLatex = `\\log_${base}(\\sqrt{${antiLog}})`

    steps.push(
      {
        math: `= \\log_${base}(${antiLog}^{\\frac{1}{2}}) \\quad || \\enskip \\sqrt{a} = a^{\\frac{1}{2}}`,
        explanation:
          "Neliöjuuren ratkaiseminen onnistuu muuttamalla juuri potenssilaskuksi.",
      },
      {
        math: `= \\frac{1}{2} \\cdot \\log_${base}(${antiLog})`,
        explanation: "Muutetaan potenssilasku kertolaskuksi.",
      },
      {
        math: `= \\frac{1}{2} \\cdot \\log_${base}(${base}^${exponent})`,
        explanation:
          "Toistetaan samat vaiheet sulkujen sisään jääneelle luvulle.",
      },
      {
        math: `= ${exponent} \\cdot \\frac{1}{2} \\cdot \\log_${base}(${base})`,
        explanation: "Muutetaan potenssilasku kertolaskuksi.",
      },
      {
        math: `= ${exponent} \\cdot \\frac{1}{2} \\cdot 1 \\quad || \\enskip \\log_a(a) = 1`,
        explanation: "Sievennetään logaritmi",
      },
      {
        math: `= ${exponent / 2}`,
      }
    )
    answers = [`${exponent / 2}`]
  } else if (currentSkillLevel === "skilled" || currentSkillLevel === "pro") {
    description = "Ratkaise"
    const base = 2
    const root = getRandomInt(3, 6)
    const exponent = getRandomInt(2, 5)
    const antiLog = base ** exponent

    descriptionLatex = `\\log_${base}(\\sqrt[${root}]{${antiLog}})`

    steps.push(
      {
        math: `= \\log_${base}(\\sqrt[${root}]{${base}^${exponent}})`,
        explanation: "Muutetatan juurrettava potenssilaskuksi",
      },
      {
        math: `= \\log_${base}((${base}^${exponent})^{\\frac{1}${root}}) \\quad || \\enskip \\sqrt[n]{a} = a^{\\frac{1}{n}}`,
        explanation: "Muutetaan n. juuri potenssilaskuksi.",
      },
      {
        math: `= \\log_${base}(${base}^{${exponent} \\cdot \\frac{1}${root}}) \\quad || \\enskip (a^b)^c = a^{b \\cdot c}`,
        explanation: "Hyödynnetään potenssilaskun ominaisuutta",
      },
      {
        math: `= \\log_${base}(${base}^{\\frac{${exponent}}{${root}}})`,
      },
      {
        math: `= \\frac{${exponent}}{${root}} \\cdot \\log_${base}(${base})  \\quad || \\enskip \\log_b(x^a) = a \\cdot \\log_b(x) `,
      },
      {
        math: `= \\frac{${exponent}}{${root}} \\cdot 1 \\quad || \\enskip \\log_a(a) = 1 `,
      },
      {
        math: `= \\frac{${exponent}}{${root}}`,
      }
    )

    const simplifiedFrac = simplifyFraction(
      { numerator: exponent, denominator: root },
      steps
    )

    answers = [fractionToLatex(simplifiedFrac)]
  }

  return {
    description,
    descriptionLatex,
    steps,
    answers,
  }
}
