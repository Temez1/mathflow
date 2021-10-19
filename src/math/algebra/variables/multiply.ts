import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Latex[] | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    const amountOfVariables = getRandomInt(2, 6)

    descriptionLatex = `${"x*".repeat(amountOfVariables - 1)}x`

    steps.push({
      math: `=x^${amountOfVariables}`,
      explanation:
        "Muuttuja symboloi (kuvaa tai edustaa) tuntematonta. " +
        "Muuttujaan pätee samat laskusäännöt kuin lukuihin. " +
        "Potenssi on lyhennysmerkintä saman luvun tai muuttujan toistuvalle kertolaskulle.",
    })
    answers = [`x^${amountOfVariables}`]
  } else if (currentSkillLevel === "skilled") {
    const a = getRandomInt(1, 9)
    const b = getRandomInt(0, 9)
    const exponentA = getRandomInt(1, 4)
    const exponentB = getRandomInt(1, 4)

    descriptionLatex = `${a}x^${exponentA}*${b}x^${exponentB}`

    steps.push(
      {
        math: `=${a}*x^${exponentA}*${b}*x^${exponentB}`,
        explanation:
          "Kertomerkki on olemassa, vaikka se jätetäänkin merkkaamatta nopeamman kirjoittamisen takia.",
      },
      {
        math: `=${a}*${b}*x^${exponentA}*x^${exponentB}`,
        explanation:
          "Kertolaskuihin pätee vaihdantalaki. Vaihdantalaki tarkoittaa, että voidaan vaihtaa termien paikkaa. " +
          "Ei ole siis väliä, missä järjestyksessä teet kertolaskun. Päädyt aina samaan lopputulokseen.",
      },
      {
        math: `=${a * b}*x^${exponentA}*x^${exponentB}`,
      },
      {
        math: `=${a * b}*x^${exponentA + exponentB}`,
        explanation:
          "Saman kantaluvun eksponentit summataan yhteen. Kantaluku voi olla myös muuttuja.",
      }
    )
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
