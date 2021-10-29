import { isEqual } from "lodash"
import { getRandomInt } from "../../utils"
import { solveQuadraticEquation } from "./utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "skilled") {
    let x1 = getRandomInt(2, 5)
    const x2 = getRandomInt(2, 5)
    let a = getRandomInt(1, 6) * x1
    const b = getRandomInt(1, 6) * x2
    // x1 is not zero
    let x1Result = -a / x1
    // x2 is not zero
    const x2Result = -b / x2

    // TODO#67
    // Avoid no answer, see https://github.com/Temez1/mathflow/issues/67
    if (isEqual(x1Result, x2Result)) {
      x1Result += 1
      x1 = getRandomInt(2, 3) * Math.abs(x1Result)
      a = x1 * getRandomInt(2, 3)
      x1Result = -a / x1
    }

    descriptionLatex = `\\frac{${x1}x+${a}}{${x2}x+${b}}=0`

    steps.push(
      {
        math: `\\frac{${x1}x+${a}}{${x2}x+${b}}=0`,
        explanation:
          "Rationaaliyhtälöä ratkaistaessa pitää ottaa huomioon, että yhtälö toteutuu vain tietyillä ehdoilla. " +
          "Ehdot ovat samat kuin murtoluvuilla, mutta nyt se koskee x:ää. Eli nimittäjä ei saa olla nolla, koska nollalla " +
          "jakamista ei ole määritelty.",
      },
      {
        math: `${x2}x+${b} \\ne 0`,
        explanation: "'≠' tarkoittaa erisuuruutta",
      },
      {
        math: `${x2}x \\ne ${-b} \\qquad || ${-b}`,
      },
      {
        math: `x \\ne \\frac{${-b}}{${x2}} `,
      }
    )

    steps.push({
      math: `x \\ne ${x2Result}`,
      explanation: "Tällä ehdolla yhtälö toteutuu.",
    })

    steps.push(
      {
        math: `\\frac{\\cancel{(${x2}x+${b})} \\cdot (${x1}x+${a})}{\\cancel{${x2}x+${b}}}= 0 \\cdot (${x2}x+${b}) \\qquad  || \\cdot ${x2}x+${b}`,
        explanation: `Nyt kun ehto on määritelty, voidaan jatkaa yhtälön ratkaisemista. Kertomalla molemmat puolet ${x2}x+${b} päästään alakerrasta eroon.`,
      },
      {
        math: `${x1}x+${a}=0`,
      },
      {
        math: `${x1}x=${-a} \\qquad || ${-a}`,
      },
      {
        math: `x=\\frac{${-a}}{${x1}}`,
      }
    )

    steps.push({
      math: `x=${x1Result} \\enskip , \\enskip x \\ne ${x2Result} `,
      explanation: "Ratkaisu täyttää ehdon, joten yhtälöllä on ratkaisu.",
    })
    answers = [`x=${x1Result} , x \\ne ${x2Result}`]
  } else if (currentSkillLevel === "beginner") {
    let x1 = getRandomInt(2, 4)
    const x2 = getRandomInt(2, 4)
    const x3 = x2 * getRandomInt(2, 3)

    let a = getRandomInt(1, 3) * x1
    const b = getRandomInt(1, 3) * x3

    // x1 is not zero
    let x1Result = -a / x1
    const x2Result = 0
    const x3Result = -x3 / x2

    // TODO#67
    // Avoid no answer, see https://github.com/Temez1/mathflow/issues/67
    if (isEqual(x1Result, x2Result)) {
      x1Result += 1
      x1 = getRandomInt(2, 3) * Math.abs(x1Result)
      a = x1 * getRandomInt(2, 3)
      x1Result = -a / x1
    }

    descriptionLatex = `\\frac{${x1}x+${a}}{${x2}x^2+${x3}x}=${b}}`

    steps.push({
      math: `${x2}x^2+${x3}x \\ne 0`,
      explanation:
        "Aloitetaan ehtojen määritteltystä. Nollalla jakamista ei ole määritelty. " +
        "Etsitään x:n arvot, joilla yhtälöä ei ole määritelty.",
    })

    steps.push(
      {
        math: `x \\cdot (${x2}x+${x3}) \\ne 0`,
        explanation: "Otetaan x yhteiseksi tekijäksi.",
      },
      {
        math: `x \\ne 0 \\qquad \\text{tai} \\qquad ${x2}x+${x3} \\ne 0 `,
        explanation:
          `Tulon nollasäännön mukaan jos a·b=0, niin jompi kumpi tulon tekijöistä on nolla, eli a=0 tai b=0.` +
          "Muutenhan tulosta ei tulisi nollaa.",
      },
      {
        math: `x \\ne 0 \\qquad \\text{tai} \\qquad ${x2}x \\ne -${x3}  \\quad || -${x3}  `,
      },
      {
        math: `x \\ne 0 \\qquad \\text{tai} \\qquad x \\ne \\frac{-${x3}}{${x2}}  \\quad || \\enskip ÷ \\enskip ${x2} `,
      },
      {
        math: `x \\ne 0 \\qquad \\text{tai} \\qquad x \\ne ${x3Result} `,
        explanation: `Lopputulokseksi tulee kaksi ehtoa, x ≠ 0 ja x≠${x3Result}`,
      }
    )

    steps.push(
      {
        math: `\\frac{${x1}x+${a}}{${x2}x^2+${x3}x}=${b}`,
        explanation: "Ehtojen määrittelyn jälkeen voidaan ratkoa yhtälö.",
      },
      {
        math: `\\frac{\\cancel{(${x2}x^2+${x3}x)} \\cdot (${x1}x+${a})}{\\cancel{${x2}x^2+${x3}x}}=${b} \\cdot (${x2}x^2+${x3}x)`,
        explanation: "Kerrotaan molemmat puolet nimittäjällä.",
      },
      {
        math: `${x1}x+${a}= ${b} \\cdot (${x2}x^2+${x3}x)`,
      },
      {
        math: `${x1}x+${a}= ${b} \\cdot ${x2}x^2 + ${b} \\cdot ${x3}x`,
      },
      {
        math: `${x1}x+${a}= ${b * x2}x^2 + ${b * x3}x`,
      },
      {
        math: `-${b * x2}x^2+${x1}x-${b * x3}x+${a} = 0`,
      },
      {
        math: `-${b * x2}x^2+${x1 - b * x3}x+${a} = 0`,
      }
    )

    const xResults = solveQuadraticEquation(-(b * x2), x1 - b * x3, a, steps)

    if (xResults)
      steps.push({
        math: `x=${x1Result} \\enskip , \\enskip x \\ne ${x2Result} `,
        explanation: "Ratkaisu täyttää ehdon, joten yhtälöllä on ratkaisu.",
      })
    answers = [`x=${x1Result} , x \\ne ${x2Result}`]
  } else if (currentSkillLevel === "pro") {
    // lol
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
