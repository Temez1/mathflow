import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let min = 0
  let max = 10

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "skilled") {
    min = -10
    max = 10
  } else if (currentSkillLevel === "pro") {
    min = -15
    max = 15
  } else if (currentSkillLevel === "expert") {
    min = -20
    max = 20
  }

  const a = getRandomInt(min, max)

  const b = getRandomInt(min, max)

  return {
    description: "Ratkaise",
    descriptionLatex: `${a}*${b}`,
    steps: [{ math: `=${a * b}` }],
    answers: [`${a * b}`],
  }
}
