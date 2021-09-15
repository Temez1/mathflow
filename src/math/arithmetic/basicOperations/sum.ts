import { getRandomInt } from "../../utils"

let currentSkillLevel: SkillLevel = "unknown"

const updateSkillLevel = (newSkillLevel: SkillLevel) => {
  currentSkillLevel = newSkillLevel
}

const getSkillLevel = (): SkillLevel => currentSkillLevel

const getChallenge = (): Challenge => {
  let min = 0
  let max = 10

  if (currentSkillLevel === "unknown") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "beginner") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "skilled") {
    min = 0
    max = 50
  } else if (currentSkillLevel === "pro") {
    min = 0
    max = 100
  } else if (currentSkillLevel === "expert") {
    min = 0
    max = 100
  }

  const a = getRandomInt(min, max)

  const b = getRandomInt(min, max)

  return {
    description: "Ratkaise",
    descriptionLatex: `${a}+${b}`,
    steps: [{ latex: `=${a + b}` }],
    answerLatex: `${a + b}`,
  }
}

export default {
  updateSkillLevel,
  getSkillLevel,
  getChallenge,
}
