import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const min = 0
  const max = 5

  const base = getRandomInt(1, 3)
  const exponent = getRandomInt(1, 2)
  const exponentiationAnswer = base ** exponent

  const squareRootAnswer = getRandomInt(0, 10)
  const squareRoot = squareRootAnswer * squareRootAnswer

  const a = getRandomInt(min, max)
  const b = getRandomInt(min, max)
  const c = getRandomInt(min, max)
  const d = getRandomInt(min, max)

  let descriptionLatex = ""
  let steps: Steps = []
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `(${a}+${b} \\cdot (${base})^${exponent}) \\cdot ${c}`
    steps = [
      {
        math: `=(${a}+${b} \\cdot ${exponentiationAnswer}) \\cdot ${c}`,
        explanation:
          "Ratkaistaan ensin sulkujen sisässä olevat laskut. Alkaen potenssista",
      },
      {
        math: `=(${a}+${b * exponentiationAnswer}) \\cdot ${c}`,
        explanation: "Ratkaistaan kertolasku ennen yhteenlaskua",
      },
      {
        math: `=${a + b * exponentiationAnswer} \\cdot ${c}`,
        explanation: "Ratkaistaan yhteenlasku suluissa",
      },
      {
        math: `=${(a + b * exponentiationAnswer) * c}`,
      },
    ]
    answers = [`${(a + b * exponentiationAnswer) * c}`]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `((${a}+${b}) \\cdot (\\sqrt{${squareRoot}}+${c}))+${d}`
    steps = [
      {
        math: `=((${a}+${b}) \\cdot (${squareRootAnswer}+${c}))+${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista. Aloitetaan ratkaisemalla neliöjuuri.",
      },
      {
        math: `=(${a + b} \\cdot (${squareRootAnswer}+${c}))+${d}`,
        explanation: "Ratkaistaan ensimmäiset sisemmät sulut",
      },
      {
        math: `=(${a + b} \\cdot ${squareRootAnswer + c})+${d}`,
        explanation: "Ratkaistaan toiset sisemmät sulut",
      },
      {
        math: `=${(a + b) * (squareRootAnswer + c)}+${d}`,
        explanation: "Ratkaistaan kertolasku suluissa",
      },
      {
        math: `=${(a + b) * (squareRootAnswer + c) + d}`,
      },
    ]
    answers = [`${(a + b) * (squareRootAnswer + c) + d}`]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `((${a}+${b}) \\cdot (\\sqrt{${squareRoot}}+${c}))+${d}`
    steps = [
      {
        math: `=((${a}+${b}) \\cdot (${squareRootAnswer}+${c}))+${d}`,
        explanation:
          "Kun sulkuja on useampia, aloitetaan aina sisimmistä suluista. Aloitetaan ratkaisemalla neliöjuuri.",
      },
      {
        math: `=(${a + b} \\cdot (${squareRootAnswer}+${c}))+${d}`,
        explanation: "Ratkaistaan ensimmäiset sisemmät sulut",
      },
      {
        math: `=(${a + b} \\cdot ${squareRootAnswer + c})+${d}`,
        explanation: "Ratkaistaan toiset sisemmät sulut",
      },
      {
        math: `=${(a + b) * (squareRootAnswer + c)}+${d}`,
        explanation: "Ratkaistaan kertolasku suluissa",
      },
      {
        math: `=${(a + b) * (squareRootAnswer + c) + d}`,
      },
    ]
    answers = [`${(a + b) * (squareRootAnswer + c) + d}`]
  }

  return {
    description: "Ratkaise",
    descriptionLatex,
    steps,
    answers,
  }
}
