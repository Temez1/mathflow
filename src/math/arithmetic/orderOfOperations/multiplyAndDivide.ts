import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const min = 0
  const max = 5

  const a = getRandomInt(min, max)
  const b = getRandomInt(min, max)
  const c = getRandomInt(min, max)
  const d = getRandomInt(min, max)
  const e = getRandomInt(min, max)
  const f = getRandomInt(min, max)

  let descriptionLatex = ""
  let steps: Steps = []
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `${a}+${b}*${c}`
    steps = [
      {
        math: `=${a} + ${b * c}`,
        explanation:
          "Kerto- ja jakolasku lasketaan ennen yhteen- ja vähennyslaskua",
      },
      { math: `=${a + b * c}` },
    ]
    answers = [{ terms: [`${a + b * c}`] }]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `${a}+${b}*${c}+${d}*(${e}+${f})`
    steps = [
      {
        math: `=${a}+${b}*${c}+${d}*${e + f}`,
        explanation: "Ratkaistaan ensin sulut, niinkuin aina.",
      },
      {
        math: `=${a}+${b * c}+${d}*${e + f}`,
        explanation: "Ratkaistaan ensimmäinen kertolasku ennen yhteenlaskuja",
      },
      {
        math: `=${a}+${b * c}+${d * (e + f)}`,
        explanation: "Ratkaistaan toinen kertolasku ennen yhteenlaskuja",
      },
      {
        math: `=${a + b * c}+${d * (e + f)}`,
        explanation: "Ratkaistaan ensimmäinen yhteenlasku",
      },
      {
        math: `=${a + b * c + d * (e + f)}`,
      },
    ]
    answers = [{ terms: [`${a + b * c + d * (e + f)}`] }]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `${a}+${b}*${c}+${d}*(${e}+${f})`
    steps = [
      {
        math: `=${a}+${b}*${c}+${d}*${e + f}`,
        explanation: "Ratkaistaan ensin sulut, niinkuin aina.",
      },
      {
        math: `=${a}+${b * c}+${d}*${e + f}`,
        explanation: "Ratkaistaan ensimmäinen kertolasku ennen yhteenlaskuja",
      },
      {
        math: `=${a}+${b * c}+${d * (e + f)}`,
        explanation: "Ratkaistaan toinen kertolasku ennen yhteenlaskuja",
      },
      {
        math: `=${a + b * c}+${d * (e + f)}`,
        explanation: "Ratkaistaan ensimmäinen yhteenlasku",
      },
      {
        math: `=${a + b * c + d * (e + f)}`,
      },
    ]
    answers = [{ terms: [`${a + b * c + d * (e + f)}`] }]
  }

  return {
    description: "Ratkaise",
    descriptionLatex,
    steps,
    answers,
  }
}
