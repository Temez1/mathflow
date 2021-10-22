import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let min = 0
  let max = 10

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "skilled") {
    min = 0
    max = 50
  } else if (currentSkillLevel === "pro") {
    min = 0
    max = 100
  }

  const a = getRandomInt(min, max)

  const b = getRandomInt(min, max)

  return {
    description: "Ratkaise",
    descriptionLatex: `${a}+${b}`,
    steps: [{ math: `=${a + b}` }],
    answers: [`${a + b}`],
  }
}
