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
    min = -50
    max = 50
  } else if (currentSkillLevel === "pro") {
    min = -100
    max = 100
  } else if (currentSkillLevel === "expert") {
    min = -100
    max = 100
  }

  const a = getRandomInt(min, max)

  const b = getRandomInt(min, max)

  let finalStep = ""
  let explanation: undefined | string

  let answers = [""]

  if (b === 0) {
    finalStep = "määrittelemätön"
    explanation = "Nollalla jakamista ei ole määritelty"
    answers = ["määrittelemätön", "eimääritelty"]
  } else {
    finalStep = `${a / b}`
    answers = [`${a / b}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex: `${a}/${b}`,
    steps: [{ math: `=${finalStep}`, explanation }],
    answers,
  }
}

export default {
  updateSkillLevel,
  getSkillLevel,
  getChallenge,
}
