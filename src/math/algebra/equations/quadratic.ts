import { getRandomInt } from "../../utils"

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

  // TODO#74
  // Simplify root, see https://github.com/Temez1/mathflow/issues/74
  // TODO#75
  // Simplify fraction with irrational numbers, see https://github.com/Temez1/mathflow/issues/75
  steps.push({
    math: `
    \\begin{align}
      & x= \\frac{ -${b} + \\sqrt{${b * b - 4 * a * c}} }{${
      2 * a
    } }, \\frac{ -${b} - \\sqrt{${b * b - 4 * a * c}} }{${
      2 * a
    } } \\enskip \\text{tai} \\\\ 
      & x= \\frac{ -${b} \\pm \\sqrt{${b * b - 4 * a * c}} }{${2 * a} }
    \\end{align}
    `,
    explanation:
      "'±' on lyhenne joka tarkoittaa, että luku on sekä positiivinen, että negatiivinen. " +
      "x:llä on siis kaksi ratkaisua. Voit vastata joko kirjoittamalla molemmat vastaukset " +
      "erikseen, tai käyttämällä '±' merkkiä.",
  })
  answers = [
    `x=\\frac{-${b}\\pm\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}`,
    `\\frac{-${b}\\pm\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}`,
    `x=\\frac{-${b}+\\sqrt{${b * b - 4 * a * c}}}{${
      2 * a
    }},\\frac{-${b}-\\sqrt{${b * b - 4 * a * c}}}{${2 * a}}`,
  ]

  return {
    description: "Ratkaise x",
    descriptionLatex,
    steps,
    answers,
  }
}
