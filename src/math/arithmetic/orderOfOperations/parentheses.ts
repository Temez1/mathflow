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
    descriptionLatex = `(${a}+${b})*${c}`
    steps = [
      {
        math: `=${a + b}*${c}`,
        explanation: "Sulkujen sisässä olevat laskut lasketaan aina ensin.",
      },
      { math: `=${(a + b) * c}` },
    ]
    answers = [{ terms: [`${(a + b) * c}`] }]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `(${a}*(${b}+${c}))*${d}`
    steps = [
      {
        math: `=(${a}*${b + c})*${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista.",
      },
      { math: `=${a * (b + c)}*${d}` },
      { math: `=${a * (b + c) * d}` },
    ]
    answers = [{ terms: [`${a * (b + c) * d}`] }]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `(${a}*(${b}+${c}))*${d}`
    steps = [
      {
        math: `=(${a}*${b + c})*${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista.",
      },
      { math: `=${a * (b + c)}*${d}` },
      { math: `=${a * (b + c) * d}` },
    ]
    answers = [{ terms: [`${a * (b + c) * d}`] }]
  }

  return {
    description: "Ratkaise",
    descriptionLatex,
    steps,
    answers,
  }
}
