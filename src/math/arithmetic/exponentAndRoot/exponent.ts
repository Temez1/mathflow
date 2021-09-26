import { getRandomInt } from "../../utils"

const getChallenge = (currentSkillLevel: SkillLevels): Challenge => {
  let baseMin = 0
  let baseMax = 10
  let exponentMin = 0
  let exponentMax = 3

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    baseMin = 0
    baseMax = 10
    exponentMin = 1
    exponentMax = 2
  } else if (currentSkillLevel === "skilled") {
    baseMin = 0
    baseMax = 10
    exponentMin = 0
    exponentMax = 3
  } else if (currentSkillLevel === "pro") {
    baseMin = 0
    baseMax = 10
    exponentMin = -3
    exponentMax = 3
  } else if (currentSkillLevel === "expert") {
    baseMin = 0
    baseMax = 10
    exponentMin = 1
    exponentMax = 2
  }

  const base = getRandomInt(baseMin, baseMax)

  const exponent = getRandomInt(exponentMin, exponentMax)

  const baseMathToRepeat = `${base.toString}*`
  const steps: Step[] = [
    {
      math: `=${baseMathToRepeat.repeat(exponent)}`,
      explanation:
        "Potenssi on lyhennysmerkintä saman luvun toistuvalle kertolaskulle. " +
        "Potenssissa kantaluku kerrotaan toistuvasti eksponentin osoittaman määrän verran",
    },
  ]

  return {
    description: "Ratkaise",
    descriptionLatex: `${base}^${exponent}`,
    steps,
    answers: [`${base ** exponent}`],
  }
}

export default {
  getChallenge,
}
