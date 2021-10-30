export interface SquareRoot {
  coefficient?: number
  root: number
}

export const squareRootToLatex = (squareRoot: SquareRoot): string => {
  if (squareRoot.coefficient) {
    return `${squareRoot.coefficient}\\sqrt{${squareRoot.root}}`
  }
  return `\\sqrt{${squareRoot.root}}`
}

export const simplifySquareRoot = (
  root: number,
  steps: Steps
): number | SquareRoot => {
  if (root === 0) {
    return 0
  }

  let divider = 2
  let insideRoot = root
  let coefficient = 1
  let simplifyAtLeastOnce = false

  steps.push({
    math: `= \\sqrt{${insideRoot}}`,
    explanation:
      "Neliöjuuren sieventämisen algoritmi toimii seuraavasti. Googlaa algoritmi, mikäli sana ei kerro vielä mitään. " +
      "Kannattaa kokeilla tehdä sieventäminen ainakin pari kertaa, ennen kuin syventyy liikaa sen toimintaan. " +
      "Juurrettava pyritään muuttamaan muotoon, jossa juurrettavan kertoimena on jokin kerroin potenssiin kaksi. " +
      "Tämä saavutetaan jakamalla juurrettava kahdesti samalla kertoimella (kerroin*kerroin=kerroin potenssiin kaksi). " +
      "Kertoimeksi valitaan aluksi 2, koska se on pienin luku jolla kannattaa yrittää jakaa (vertaa ykkösellä jakaminen). " +
      "Jos taas kertoimeksi valittaisiin isompi luku (vaikka 3), mitä kävisi tilanteessa, jossa juurrettava olisi 4? " +
      "Kerrointa suurennetaan aina kun juurrettava ei ole jaollinen enää kyseisellä kertoimella. Tätä toistetaan, " +
      "kunnes juurrettavaa ei voi jakaa enää kertoimella.",
  })

  while (divider * divider <= insideRoot) {
    if (insideRoot % (divider * divider) === 0) {
      insideRoot /= divider * divider

      if (coefficient === 1) {
        steps.push(
          {
            math: `= \\sqrt{${divider} \\cdot ${divider * insideRoot}}`,
          },
          {
            math: `= \\sqrt{${divider} \\cdot ${divider} \\cdot ${insideRoot}}`,
            explanation: `Juurrettavan voi jakaa ${divider}:lla kahdesti.`,
          },
          {
            math: `= \\sqrt{${divider}^2 \\cdot ${insideRoot}}`,
          },

          {
            math: `= \\sqrt{${divider}^2} \\cdot \\sqrt{${insideRoot}}`,
          }
        )
      } else {
        steps.push(
          {
            math: `= ${coefficient} \\sqrt{${divider} \\cdot ${
              divider * insideRoot
            }}`,
          },
          {
            math: `= ${coefficient} \\sqrt{${divider} \\cdot ${divider} \\cdot ${insideRoot}}`,
            explanation: `Juurrettavan voi jakaa ${divider}:lla kahdesti.`,
          },
          {
            math: `= ${coefficient} \\sqrt{${divider}^2 \\cdot ${insideRoot}}`,
          },
          {
            math: `= ${coefficient} \\cdot \\sqrt{${divider}^2} \\cdot \\sqrt{${insideRoot}}`,
          },
          {
            math: `= ${coefficient} \\cdot ${divider} \\sqrt{${insideRoot}}`,
          }
        )
      }

      coefficient *= divider
      simplifyAtLeastOnce = true
      steps.push({
        math: `= ${coefficient} \\sqrt{${insideRoot}}`,
      })
    } else {
      divider += 1
    }
  }

  if (!simplifyAtLeastOnce) {
    steps.pop()
  }

  if (coefficient === 1) {
    return { root: insideRoot }
  }
  if (insideRoot === 1) {
    steps.push({ math: `= ${coefficient}` })
    return coefficient
  }
  return { coefficient, root: insideRoot }
}
