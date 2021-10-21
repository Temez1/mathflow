import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const min = 1
  const max = 3
  const a = getRandomInt(min, max)

  const base = getRandomInt(1, 4)
  const exponent = getRandomInt(0, 3)
  const exponentiationAnswer = base ** exponent

  const squareRootAnswer = getRandomInt(0, 10)
  const squareRoot = squareRootAnswer * squareRootAnswer

  let descriptionLatex = ""
  let steps: Steps = []
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `(${base})^${exponent}*${a}*\\sqrt{${squareRoot}}`
    steps = [
      {
        math: `=${exponentiationAnswer}*${a}*${squareRootAnswer}`,
        explanation:
          "Potenssi ja neliöjuuri lasketaan ennen kerto- tai jakolaskua.",
      },
      {
        math: `=${exponentiationAnswer * a}*${squareRootAnswer}`,
      },
      {
        math: `=${exponentiationAnswer * a * squareRootAnswer}`,
      },
    ]
    answers = [{ terms: [`${exponentiationAnswer * a * squareRootAnswer}`] }]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `((${base})^${exponent}+${a})*\\sqrt{${squareRoot}}`
    steps = [
      {
        math: `=(${exponentiationAnswer}+${a})*\\sqrt{${squareRoot}}`,
        explanation:
          "Ratkaistaan ensin sulkujen sisässä olevat laskut. Alkaen potenssista",
      },
      {
        math: `=(${exponentiationAnswer + a})*\\sqrt{${squareRoot}}`,
        explanation: "Ratkaistaan sulkujen sisässä olevat laskut loppuun.",
      },
      {
        math: `=${exponentiationAnswer + a}*${squareRootAnswer}`,
        explanation: "Ratkaistaan neliöjuuri kun sulut on ratkaistu.",
      },
      {
        math: `=${(exponentiationAnswer + a) * squareRootAnswer}`,
      },
    ]
    answers = [{ terms: [`${(exponentiationAnswer + a) * squareRootAnswer}`] }]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `((${base})^${exponent}+${a})*\\sqrt{${squareRoot}}`
    steps = [
      {
        math: `=(${exponentiationAnswer}+${a})*\\sqrt{${squareRoot}}`,
        explanation:
          "Ratkaistaan ensin sulkujen sisässä olevat laskut. Alkaen potenssista",
      },
      {
        math: `=(${exponentiationAnswer + a})*\\sqrt{${squareRoot}}`,
        explanation: "Ratkaistaan sulkujen sisässä olevat laskut loppuun.",
      },
      {
        math: `=${exponentiationAnswer + a}*${squareRootAnswer}`,
        explanation: "Ratkaistaan neliöjuuri kun sulut on ratkaistu.",
      },
      {
        math: `=${(exponentiationAnswer + a) * squareRootAnswer}`,
      },
    ]
    answers = [{ terms: [`${(exponentiationAnswer + a) * squareRootAnswer}`] }]
  }

  return {
    description: "Ratkaise",
    descriptionLatex,
    steps,
    answers,
  }
}
