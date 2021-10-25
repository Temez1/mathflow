import { getRandomInt } from "../../utils"
import { Term, simplifyTerm } from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    const amountOfVariables = getRandomInt(2, 6)

    descriptionLatex = `${"x \\cdot ".repeat(amountOfVariables - 1)}x`

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

    descriptionLatex = `${a}x^${exponentA} \\cdot ${b}x^${exponentB}`

    steps.push(
      {
        math: `=${a} \\cdot x^${exponentA} \\cdot ${b} \\cdot x^${exponentB}`,
        explanation:
          "Kertomerkki on olemassa, vaikka se jätetäänkin merkkaamatta nopeamman kirjoittamisen takia.",
      },
      {
        math: `=${a} \\cdot ${b} \\cdot x^${exponentA} \\cdot x^${exponentB}`,
        explanation:
          "Kertolaskuihin pätee vaihdantalaki. Vaihdantalaki tarkoittaa, että voidaan vaihtaa termien paikkaa. " +
          "Ei ole siis väliä, missä järjestyksessä teet kertolaskun. Päädyt aina samaan lopputulokseen.",
      },
      {
        math: `=${a * b} \\cdot x^${exponentA} \\cdot x^${exponentB}`,
      },
      {
        math: `=${a * b}x^{${exponentA} + ${exponentB}}`,
        explanation:
          "Saman kantaluvun eksponentit summataan yhteen. Kantaluku voi olla myös muuttuja.",
      },
      {
        math: `=${a * b}x^{${exponentA + exponentB}}`,
      }
    )

    const term: Term = {
      coefficient: a * b,
      variable: "x",
      exponent: exponentA + exponentB,
    }
    answers = [simplifyTerm(term, steps)]
  } else if (currentSkillLevel === "pro") {
    const a = getRandomInt(1, 9)
    const b = getRandomInt(0, 9)
    const exponentA = getRandomInt(1, 4)
    const exponentB = getRandomInt(1, 4)

    descriptionLatex = `${a}x^${exponentA} \\cdot ${b}x^${exponentB}`

    steps.push(
      {
        math: `=${a} \\cdot x^${exponentA} \\cdot ${b} \\cdot x^${exponentB}`,
        explanation:
          "Kertomerkki on olemassa, vaikka se jätetäänkin merkkaamatta nopeamman kirjoittamisen takia.",
      },
      {
        math: `=${a} \\cdot ${b} \\cdot x^${exponentA} \\cdot x^${exponentB}`,
        explanation:
          "Kertolaskuihin pätee vaihdantalaki. Vaihdantalaki tarkoittaa, että voidaan vaihtaa termien paikkaa. " +
          "Ei ole siis väliä, missä järjestyksessä teet kertolaskun. Päädyt aina samaan lopputulokseen.",
      },
      {
        math: `=${a * b} \\cdot x^${exponentA} \\cdot x^${exponentB}`,
      },
      {
        math: `=${a * b}x^{${exponentA} + ${exponentB}}`,
        explanation:
          "Saman kantaluvun eksponentit summataan yhteen. Kantaluku voi olla myös muuttuja.",
      },
      {
        math: `=${a * b}x^{${exponentA + exponentB}}`,
      }
    )

    const term: Term = {
      coefficient: a * b,
      variable: "x",
      exponent: exponentA + exponentB,
    }
    answers = [simplifyTerm(term, steps)]
  }

  return {
    description: "Sievennä",
    descriptionLatex,
    steps,
    answers,
  }
}
