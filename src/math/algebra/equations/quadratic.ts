import { getRandomInt } from "../../utils"
import {
  simplifySquareRoot,
  squareRootToLatex,
} from "../../arithmetic/exponentiationAndRoot/utils"
import {
  simplifyFraction,
  fractionToLatex,
} from "../../arithmetic/fractions/utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  const a = getRandomInt(-5, -1)
  const b = getRandomInt(1, 6)
  const c = getRandomInt(1, 5)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `${a}x^2+${b}x+${c}=0`

    steps.push(
      {
        math: `ax^2+bx+c=0`,
        explanation:
          "Toisen asteen yhtälö on jo valmiiksi yllä olevassa normaalimuodossa. " +
          "Voidaan siis edetä.",
      },
      {
        math: `x= \\frac{ -b \\pm \\sqrt{b^2-4ac} }{ 2a }`,
        explanation:
          "Käytetään toisen asteen yhtälön ratkaisukaavaa x:n ratkaisemiseen.",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b}^2 - 4 \\cdot ${a} \\cdot ${c}} }{ 2 \\cdot ${a} }`,
        explanation: `Sijoitetaan a=${a}, b=${b} ja c=${c} kaavaan.`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - 4 \\cdot ${
          a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan potenssi ja jälkimmäinen kertolasku",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - ${
          4 * a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan kertolasku loppuun",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${
          b * b - 4 * a * c
        }} }{ 2 \\cdot ${a} }`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b - 4 * a * c}} }{${2 * a} }`,
        explanation: "Ratkaistaan nimittäjän kertolasku",
      }
    )
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `${a}x^2=-${c}-${b}x`

    steps.push(
      {
        math: `${a}x^2+${b}x+${c}=0`,
        explanation:
          "Muutetaan toisen asteen yhtälö normaalimuotoon. " +
          "Eli termit vasemmalle ja järjestetään suurimmasta asteluvusta (potenssista) pienimpään.",
      },
      {
        math: `x= \\frac{ -b \\pm \\sqrt{b^2-4ac} }{ 2a }`,
        explanation:
          "Käytetään toisen asteen yhtälön ratkaisukaavaa x:n ratkaisemiseen.",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b}^2 - 4 \\cdot ${a} \\cdot ${c}} }{ 2 \\cdot ${a} }`,
        explanation: `Sijoitetaan a=${a}, b=${b} ja c=${c} kaavaan.`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - 4 \\cdot ${
          a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan potenssi ja jälkimmäinen kertolasku",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - ${
          4 * a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan kertolasku loppuun",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${
          b * b - 4 * a * c
        }} }{ 2 \\cdot ${a} }`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b - 4 * a * c}} }{${2 * a} }`,
        explanation: "Ratkaistaan nimittäjän kertolasku",
      }
    )
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `${a}x^2=-${c}-${b}x`

    steps.push(
      {
        math: `${a}x^2+${b}x+${c}=0`,
        explanation:
          "Muutetaan toisen asteen yhtälö normaalimuotoon. " +
          "Eli termit vasemmalle ja järjestetään suurimmasta asteluvusta (potenssista) pienimpään.",
      },
      {
        math: `x= \\frac{ -b \\pm \\sqrt{b^2-4ac} }{ 2a }`,
        explanation:
          "Käytetään toisen asteen yhtälön ratkaisukaavaa x:n ratkaisemiseen.",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b}^2 - 4 \\cdot ${a} \\cdot ${c}} }{ 2 \\cdot ${a} }`,
        explanation: `Sijoitetaan a=${a}, b=${b} ja c=${c} kaavaan.`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - 4 \\cdot ${
          a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan potenssi ja jälkimmäinen kertolasku",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b} - ${
          4 * a * c
        }} }{ 2 \\cdot ${a} }`,
        explanation: "Ratkaistaan kertolasku loppuun",
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${
          b * b - 4 * a * c
        }} }{ 2 \\cdot ${a} }`,
      },
      {
        math: `x= \\frac{ -${b} \\pm \\sqrt{${b * b - 4 * a * c}} }{${2 * a} }`,
        explanation: "Ratkaistaan nimittäjän kertolasku",
      }
    )
  }

  const simplifiedSquareRoot = simplifySquareRoot(b * b - 4 * a * c, steps)

  if (typeof simplifiedSquareRoot === "number") {
    const denominator = 2 * a

    if (simplifiedSquareRoot === 0) {
      steps.push({
        math: `x= \\frac{ -${b} \\pm ${simplifiedSquareRoot} }{${denominator} }`,
        explanation:
          "Koska neliöjuuri osuus (kutsutaan diskriminantiksi) on nolla, x:llä on vain yksi vastaus.",
      })

      const x1SimplifiedFraction = simplifyFraction(
        { numerator: -b, denominator },
        steps
      )

      const x1Latex = fractionToLatex(x1SimplifiedFraction)
      steps.push({
        math: `x=${x1Latex}`,
      })
      answers = [`x=${x1Latex}`, `${x1Latex}`]
    } else {
      steps.push(
        {
          math: `x= \\frac{ -${b} + ${simplifiedSquareRoot} }{${denominator} }, x= \\frac{ -${b} - ${simplifiedSquareRoot} }{${denominator} },`,
          explanation:
            "Koska neliöjuuri sievenee kokonaisluvuksi, jaetaan vastaukset erikseen. ",
        },
        {
          math: `x= \\frac{ ${
            -b + simplifiedSquareRoot
          } }{${denominator} }, x= \\frac{ ${
            -b - simplifiedSquareRoot
          } }{${denominator} },`,
        }
      )

      const x1SimplifiedFraction = simplifyFraction(
        { numerator: -b + simplifiedSquareRoot, denominator },
        steps
      )
      const x2SimplifiedFraction = simplifyFraction(
        { numerator: -b - simplifiedSquareRoot, denominator },
        steps
      )

      steps.push({
        math: `x=${fractionToLatex(x1SimplifiedFraction)}, ${fractionToLatex(
          x2SimplifiedFraction
        )}`,
        explanation: "x saa kaksi vastausta.",
      })

      answers = [
        `x=${fractionToLatex(x1SimplifiedFraction)}, ${fractionToLatex(
          x2SimplifiedFraction
        )}`,
        `x=${fractionToLatex(x1SimplifiedFraction)}, x=${fractionToLatex(
          x2SimplifiedFraction
        )}`,
      ]
    }
  } else {
    // TODO#75
    // Simplify fraction with irrational numbers, see https://github.com/Temez1/mathflow/issues/75

    const squareRootLatex = squareRootToLatex(simplifiedSquareRoot)

    steps.push({
      math: `
    \\begin{align}
      & x= \\frac{ -${b} + ${squareRootLatex} }{${
        2 * a
      } }, \\frac{ -${b} -  ${squareRootLatex} }{${
        2 * a
      } } \\enskip \\text{tai} \\\\ 
      & x= \\frac{ -${b} \\pm  ${squareRootLatex} }{${2 * a} }
    \\end{align}
    `,
      explanation:
        "'±' on lyhenne joka tarkoittaa, että luku on sekä positiivinen, että negatiivinen. " +
        "x:llä on siis kaksi ratkaisua. Voit vastata joko kirjoittamalla molemmat vastaukset " +
        "erikseen, tai käyttämällä '±' merkkiä.",
    })
    answers = [
      `x=\\frac{-${b}\\pm${squareRootLatex}}{${2 * a}}`,
      `\\frac{-${b}\\pm${squareRootLatex}}{${2 * a}}`,
      `x=\\frac{-${b}+${squareRootLatex}}{${2 * a}},\\frac{-${b}-\\sqrt{${
        b * b - 4 * a * c
      }}}{${2 * a}}`,
    ]
  }

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
