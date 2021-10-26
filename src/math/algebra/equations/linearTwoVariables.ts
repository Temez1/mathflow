import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []

  let xResult = 0
  let yResult = 0

  const x2Coefficient = getRandomInt(3, 10)

  // TODO#67
  // See https://github.com/Temez1/mathflow/issues/67
  // As long as the x & y coefficients aren't the same the system is "solvable"
  // Also simplify logic needed (x coefficient will always be one)
  const y2Coefficient = x2Coefficient - 1

  const a = getRandomInt(1, 10)
  const b = getRandomInt(1, 10)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `\\begin{cases}
                          \\begin{align}
                            x + y & \\enskip = ${a} \\\\
                            ${x2Coefficient}x + ${y2Coefficient}y & \\enskip = ${b}
                          \\end{align}
                        \\end{cases}`

    steps.push(
      {
        math: `\\begin{cases}
                \\begin{align}
                  y & \\enskip = ${a} - x  & || -x \\\\ 
                  ${x2Coefficient}x + ${y2Coefficient}y & \\enskip = ${b} &
                \\end{align}
              \\end{cases}`,
        explanation:
          "Muutetaan ylempi yhtälö muotoon, jossa vain y on vasemmalla puolella. " +
          "Vähennetään x molemmilta puolilta.",
      },
      {
        math: `${x2Coefficient}x + ${y2Coefficient}y = ${b}`,
        explanation: "Tämän jälkeen voidaan ratkaista x alemmasta yhtälöstä.",
      },
      {
        math: `${x2Coefficient}x + ${y2Coefficient} \\cdot (${a} - x) = ${b}`,
        explanation: `Sijoitetaan y:n arvo ${a}-x alempaan yhtälöön y:n paikalle.`,
      },
      {
        math: `${x2Coefficient}x + ${y2Coefficient} \\cdot ${a} - ${y2Coefficient} \\cdot x = ${b}`,
        explanation: "Avataan sulut.",
      },
      {
        math: `${x2Coefficient}x - ${y2Coefficient}x + ${
          y2Coefficient * a
        } = ${b}`,
        explanation: "Järjestetään samankaltaiset termit vierekkäin.",
      },
      {
        math: `x = ${b} - ${y2Coefficient * a}`,
        explanation: `Vähennetään ${y2Coefficient * a} molemmilta puolilta`,
      },
      {
        math: `x = ${b - y2Coefficient * a}`,
      }
    )

    xResult = b - y2Coefficient * a

    steps.push(
      {
        math: `y = ${a} - x`,
        explanation:
          `Kun x on ratkaistu, saadaan y ratkaistua sijoittamalla x:n arvo ${xResult} kumpaan tahansa yhtälöön. ` +
          "Valitaan ylempi yhtälö, joka muutettiin aiemmin jo sopivaan muotoon.",
      },
      {
        math: `y = ${a} - ${xResult}`,
      }
    )

    yResult = a - xResult

    steps.push({
      math: `y = ${yResult}`,
    })
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `\\begin{cases}
                          \\begin{align}
                            ${x2Coefficient}x + ${b} + ${y2Coefficient}y & \\enskip = 0 \\\\
                            y + x - ${a} & \\enskip = 0
                          \\end{align}
                        \\end{cases}`

    steps.push(
      {
        math: `\\begin{cases}
                \\begin{align}
                  ${x2Coefficient}x + ${b} + ${y2Coefficient}y & \\enskip = 0 & \\\\
                  y & \\enskip = -x + ${a} & || -x + ${a}
                \\end{align}
              \\end{cases}`,
        explanation:
          "Muutetaan alempi yhtälö muotoon, jossa vain y on vasemmalla puolella. " +
          `Vähennetään x ja lisätään ${a} molemmille puolille.`,
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient}y = 0`,
        explanation: "Tämän jälkeen voidaan ratkaista x ylemmästä yhtälöstä.",
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient} \\cdot (-x+${a}) = 0`,
        explanation: `Sijoitetaan y:n arvo -x+${a} alempaan yhtälöön y:n paikalle.`,
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient} \\cdot -x + ${y2Coefficient} \\cdot ${a} = 0`,
        explanation: `Avataan sulut`,
      },
      {
        math: `${x2Coefficient}x + ${b} -${y2Coefficient}x + ${
          y2Coefficient * a
        } = 0`,
      },
      {
        math: `${x2Coefficient}x -${y2Coefficient}x + ${b} + ${
          y2Coefficient * a
        } = 0`,
        explanation: "Järjestetään samankaltaiset termit vierekkäin.",
      },
      {
        math: `x +${b + y2Coefficient * a} = 0`,
      },
      {
        math: `x = -${b + y2Coefficient * a}`,
        explanation: `Vähennetään ${
          b + y2Coefficient * a
        } molemmilta puolilta.`,
      }
    )

    xResult = -(b + y2Coefficient * a)

    steps.push(
      {
        math: `y = -x + ${a}`,
        explanation:
          `Kun x on ratkaistu, saadaan y ratkaistua sijoittamalla x:n arvo ${xResult} kumpaan tahansa yhtälöön. ` +
          "Valitaan alempi yhtälö, joka muutettiin aiemmin jo sopivaan muotoon.",
      },
      {
        math: `y = -${xResult} + ${a}`,
      }
    )

    yResult = -xResult + a

    steps.push({
      math: `y = ${yResult}`,
    })
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `\\begin{cases}
                          \\begin{align}
                            ${x2Coefficient}x + ${b} + ${y2Coefficient}y & \\enskip = 0 \\\\
                            y + x - ${a} & \\enskip = 0
                          \\end{align}
                        \\end{cases}`

    steps.push(
      {
        math: `\\begin{cases}
                \\begin{align}
                  ${x2Coefficient}x + ${b} + ${y2Coefficient}y & \\enskip = 0 & \\\\
                  y & \\enskip = -x + ${a} & || -x + ${a}
                \\end{align}
              \\end{cases}`,
        explanation:
          "Muutetaan alempi yhtälö muotoon, jossa vain y on vasemmalla puolella. " +
          `Vähennetään x ja lisätään ${a} molemmille puolille.`,
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient}y = 0`,
        explanation: "Tämän jälkeen voidaan ratkaista x ylemmästä yhtälöstä.",
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient} \\cdot (-x+${a}) = 0`,
        explanation: `Sijoitetaan y:n arvo -x+${a} alempaan yhtälöön y:n paikalle.`,
      },
      {
        math: `${x2Coefficient}x + ${b} + ${y2Coefficient} \\cdot -x + ${y2Coefficient} \\cdot ${a} = 0`,
        explanation: `Avataan sulut`,
      },
      {
        math: `${x2Coefficient}x + ${b} -${y2Coefficient}x + ${
          y2Coefficient * a
        } = 0`,
      },
      {
        math: `${x2Coefficient}x -${y2Coefficient}x + ${b} + ${
          y2Coefficient * a
        } = 0`,
        explanation: "Järjestetään samankaltaiset termit vierekkäin.",
      },
      {
        math: `x +${b + y2Coefficient * a} = 0`,
      },
      {
        math: `x = -${b + y2Coefficient * a}`,
        explanation: `Vähennetään ${
          b + y2Coefficient * a
        } molemmilta puolilta.`,
      }
    )

    xResult = -(b + y2Coefficient * a)

    steps.push(
      {
        math: `y = -x + ${a}`,
        explanation:
          `Kun x on ratkaistu, saadaan y ratkaistua sijoittamalla x:n arvo ${xResult} kumpaan tahansa yhtälöön. ` +
          "Valitaan alempi yhtälö, joka muutettiin aiemmin jo sopivaan muotoon.",
      },
      {
        math: `y = -${xResult} + ${a}`,
      }
    )

    yResult = -xResult + a

    steps.push({
      math: `y = ${yResult}`,
    })
  }

  steps.push({
    math: `x=${xResult}, \\enskip y=${yResult}`,
  })
  answers = [`x=${xResult},y=${yResult}`]

  return {
    description: "Ratkaise x ja y",
    descriptionLatex,
    steps,
    answers,
  }
}
