import { getRandomInt } from "../../utils"

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
  }

  return {
    description,
    descriptionLatex,
    steps,
    answers,
  }
}
