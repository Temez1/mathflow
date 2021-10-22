import { getRandomInt } from "../../utils"
import { divisionByZero } from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let min = 0
  let max = 10

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "skilled") {
    min = 0
    max = 10
  } else if (currentSkillLevel === "pro") {
    min = 0
    max = 15
  }

  const denominator = getRandomInt(min, max)
  let numerator

  if (denominator === 0) {
    numerator = getRandomInt(min, max)
  } else {
    // We want the answer to be an integer
    numerator = denominator * getRandomInt(min, max)
  }

  let steps: Steps = []
  let answers: Answers | undefined = []

  if (divisionByZero(denominator, steps)) {
    answers = undefined
  } else {
    steps = [
      {
        math: `=${numerator / denominator}`,
      },
    ]
    answers = [`${numerator / denominator}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex: `${numerator} \\div ${denominator}`,
    steps,
    answers,
  }
}
