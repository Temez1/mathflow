import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let minA = 0
  let maxA = 5
  let minB = 5
  let maxB = 10

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    minA = 5
    maxA = 10
    minB = 0
    maxB = 5
  } else if (currentSkillLevel === "skilled") {
    minA = 25
    maxA = 50
    minB = 0
    maxB = 25
  } else if (currentSkillLevel === "pro") {
    minA = 25
    maxA = 50
    minB = 0
    maxB = 25
  } else if (currentSkillLevel === "expert") {
    minA = 25
    maxA = 50
    minB = 0
    maxB = 25
  }

  const a = getRandomInt(minA, maxA)

  const b = getRandomInt(minB, maxB)

  return {
    description: "Ratkaise",
    descriptionLatex: `${a}-${b}`,
    steps: [{ math: `=${a - b}` }],
    answers: [`${a - b}`],
  }
}
