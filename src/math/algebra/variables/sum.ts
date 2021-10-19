import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Latex[] | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    const amountOfVariables = getRandomInt(2, 6)

    descriptionLatex = `${"x+".repeat(amountOfVariables - 1)}x`

    steps.push({
      math: `=${amountOfVariables}*x = ${amountOfVariables}x`,
      explanation:
        "Muuttuja symboloi (kuvaa tai edustaa) tuntematonta. " +
        "Muuttujaan pätee samat laskusäännöt kuin lukuihin. " +
        "Kertomerkki jätetään merkkaamatta, lyhyemmän merkinnän takia.",
    })
    answers = [`${amountOfVariables}x`]
  } else if (currentSkillLevel === "skilled") {
    const a = getRandomInt(0, 10)
    const b = getRandomInt(0, 10)

    descriptionLatex = `${a}x+${b}x`

    steps.push({
      math: `=${a + b}x`,
    })
    answers = [`${a + b}x`]
  } else if (currentSkillLevel === "pro") {
    const a = getRandomInt(0, 10)
    const b = getRandomInt(0, 10)

    descriptionLatex = `${a}x+${b}x`

    steps.push({
      math: `=${a + b}x`,
    })
    answers = [`${a + b}x`]
  } else if (currentSkillLevel === "expert") {
    const a = getRandomInt(0, 10)
    const b = getRandomInt(0, 10)

    descriptionLatex = `${a}x+${b}x`

    steps.push({
      math: `=${a + b}x`,
    })
    answers = [`${a + b}x`]
  }

  return {
    description: "Sievennä",
    descriptionLatex,
    steps,
    answers,
  }
}
