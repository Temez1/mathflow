import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  let min = 1
  let max = 5

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    min = 1
    max = 5
  } else if (currentSkillLevel === "skilled") {
    min = -5
    max = 10
  } else if (currentSkillLevel === "pro") {
    min = -10
    max = 10
  } else if (currentSkillLevel === "expert") {
    min = -10
    max = 10
  }

  let a = getRandomInt(min, max)

  if (a < 0) {
    a = -(a * a)
  } else {
    a *= a
  }

  let steps: Steps = []
  let answers: Latex[] | undefined = []

  if (a < 0) {
    steps = [
      {
        math: "=määrittelemätön",
        explanation: "Negatiivisen luvun neliöjuurta ei ole määritelty",
      },
    ]
    answers = undefined
  } else {
    const solvedA = Math.sqrt(a)
    steps = [
      {
        math: `=${solvedA}`,
        explanation: `${solvedA} * ${solvedA} =${
          solvedA * solvedA
        }, mikä on alkuperäinen luku neliöjuuressa`,
      },
    ]
    answers = [`${solvedA}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex: `\\sqrt{${a}}`,
    steps,
    answers,
  }
}
