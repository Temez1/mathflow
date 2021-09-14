import { getRandomInt } from "../../../utils"

export interface SumProps {
  skillLevel: SkillLevel
}

export default (props: SumProps): Challenge => {
  const { skillLevel } = props

  let min = 0
  let max = 10

  if (skillLevel === "unknown") {
    min = 0
    max = 10
  } else if (skillLevel === "beginner") {
    min = 0
    max = 10
  } else if (skillLevel === "skilled") {
    min = 0
    max = 50
  } else if (skillLevel === "pro") {
    min = 0
    max = 100
  } else if (skillLevel === "expert") {
    min = 0
    max = 100
  }

  const a = getRandomInt(min, max)

  const b = getRandomInt(min, max)

  return {
    description: "Ratkaise",
    steps: [{ mathLatex: `${a}+${b}` }, { mathLatex: `=${a + b}` }],
  }
}
