import { getRandomInt } from "../../utils"
import { solveQuadraticEquation, rationalNumberToLatex } from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  const a = getRandomInt(-5, -1)
  const b = getRandomInt(1, 6)
  const c = getRandomInt(1, 5)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `${a}x^2+${b}x+${c}=0`

    steps.push({
      math: `ax^2+bx+c=0`,
      explanation:
        "Toisen asteen yhtälö on jo valmiiksi yllä olevassa normaalimuodossa. " +
        "Voidaan siis edetä.",
    })
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `${a}x^2=-${c}-${b}x`

    steps.push({
      math: `${a}x^2+${b}x+${c}=0`,
      explanation:
        "Muutetaan toisen asteen yhtälö normaalimuotoon. " +
        "Eli termit vasemmalle ja järjestetään suurimmasta asteluvusta (potenssista) pienimpään.",
    })
  }

  const { result, steps: s } = solveQuadraticEquation(a, b, c)

  steps.push(...s)

  if (result === undefined) {
    answers = undefined
  } else if (typeof result[0] === "string" || typeof result[1] === "string") {
    answers = [
      `x=${result[0]}, x=${result[1]}`,
      `x=${result[0]}, ${result[1]}`,
      `x=${result[2]}`,
    ]
  } else {
    const x1Latex = rationalNumberToLatex(result[0])
    const x2Latex = rationalNumberToLatex(result[1])

    if (result.length === 1) {
      answers = [`x=${x1Latex}`]
    } else {
      answers = [`x=${x1Latex},x=${x2Latex}`, `x=${x1Latex},${x2Latex}`]
    }
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
