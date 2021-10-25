import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const min = 0
  const max = 5

  const a = getRandomInt(min, max)
  const b = getRandomInt(min, max)
  const c = getRandomInt(min, max)
  const d = getRandomInt(min, max)

  let descriptionLatex = ""
  let steps: Steps = []
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `(${a}+${b}) \\cdot ${c}`
    steps = [
      {
        math: `=${a + b} \\cdot ${c}`,
        explanation: "Sulkujen sisässä olevat laskut lasketaan aina ensin.",
      },
      { math: `=${(a + b) * c}` },
    ]
    answers = [`${(a + b) * c}`]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `(${a} \\cdot (${b}+${c})) \\cdot ${d}`
    steps = [
      {
        math: `=(${a} \\cdot ${b + c}) \\cdot ${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista.",
      },
      { math: `=${a * (b + c)} \\cdot ${d}` },
      { math: `=${a * (b + c) * d}` },
    ]
    answers = [`${a * (b + c) * d}`]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `(${a} \\cdot (${b}+${c})) \\cdot ${d}`
    steps = [
      {
        math: `=(${a} \\cdot ${b + c}) \\cdot ${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista.",
      },
      { math: `=${a * (b + c)} \\cdot ${d}` },
      { math: `=${a * (b + c) * d}` },
    ]
    answers = [`${a * (b + c) * d}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex,
    steps,
    answers,
  }
}
