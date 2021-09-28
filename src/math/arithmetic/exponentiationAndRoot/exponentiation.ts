import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
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
    baseMin = -5
    baseMax = 5
    exponentMin = 0
    exponentMax = 3
  } else if (currentSkillLevel === "pro") {
    baseMin = -6
    baseMax = 6
    exponentMin = -3
    exponentMax = 3
  } else if (currentSkillLevel === "expert") {
    baseMin = -10
    baseMax = 10
    exponentMin = -3
    exponentMax = 3
  }

  const base = getRandomInt(baseMin, baseMax)

  const exponent = getRandomInt(exponentMin, exponentMax)

  let steps: Step[] = []
  let answers: Latex[] | undefined = []

  if (exponent === 0 && base !== 0) {
    steps = [
      {
        math: `=1`,
        explanation: "Kaikki nollaa suuremmat luvut potenssiin nolla on yksi.",
      },
    ]
    answers = ["1"]
  } else if (exponent === 0 && base === 0) {
    steps = [
      {
        math: `=määrittelemätön`,
        explanation: "Nolla potenssiin nolla on määrittelemätön",
      },
    ]
    answers = undefined
  } else {
    const baseWithMultiplier = `${base.toString()}*`
    const exponentiationAsMultiplies = `${baseWithMultiplier.repeat(
      exponent - 1
    )}${base}`
    steps = [
      {
        math: `=${exponentiationAsMultiplies}`,
        explanation:
          "Potenssi on lyhennysmerkintä saman luvun toistuvalle kertolaskulle. " +
          "Potenssissa kantaluku kerrotaan toistuvasti eksponentin osoittaman määrän verran",
      },
      {
        math: `=${base ** exponent}`,
      },
    ]
    answers = [`${base ** exponent}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex: `${base}^${exponent}`,
    steps,
    answers,
  }
}
