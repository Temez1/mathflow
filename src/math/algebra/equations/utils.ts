import {
  simplifySquareRoot,
  squareRootToLatex,
} from "../../arithmetic/exponentiationAndRoot/utils"
import {
  SimplifiedFraction,
  simplifyFraction,
  fractionToLatex,
} from "../../arithmetic/fractions/utils"

export type RationalNumber = number | SimplifiedFraction | undefined

// eslint-disable-next-line import/prefer-default-export
export const solveQuadraticEquation = (
  a: number,
  b: number,
  c: number,
  steps: Steps
): RationalNumber | RationalNumber[] | Latex => {
  const discriminant = b * b - 4 * a * c
  const denominator = 2 * a

  if (denominator === 0) {
    // It's not quadratic if a is zero
    return undefined
  }

  if (discriminant < 0) {
    steps.push(
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
        explanation:
          "Koska neliöjuuri on negatiivinen, x:llä ei ole yhtäkään ratkaisua.",
      }
    )
    return undefined
  }

  steps.push(
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
  const simplifiedSquareRoot = simplifySquareRoot(discriminant, steps)

  if (typeof simplifiedSquareRoot === "number") {
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
      return x1SimplifiedFraction
    }
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

    // denominator is never 0 (a is never zero)
    const x1SimplifiedFraction = simplifyFraction(
      { numerator: -b + simplifiedSquareRoot, denominator },
      steps
    ) as number | SimplifiedFraction
    const x2SimplifiedFraction = simplifyFraction(
      { numerator: -b - simplifiedSquareRoot, denominator },
      steps
    ) as number | SimplifiedFraction

    steps.push({
      math: `x=${fractionToLatex(x1SimplifiedFraction)}, ${fractionToLatex(
        x2SimplifiedFraction
      )}`,
      explanation: "x saa kaksi vastausta.",
    })
    return [x1SimplifiedFraction, x2SimplifiedFraction]
  }
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
  return squareRootLatex
  // Remove latex from return values
  // END TODO
}
