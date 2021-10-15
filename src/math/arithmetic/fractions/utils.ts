import { greatestCommonDivisor } from "../../utils"

export interface Fraction {
  numerator: number
  denominator: number
}

export const simplifyNonZeroFraction = (
  fraction: Fraction,
  steps: Step[]
): Fraction | number => {
  const { numerator, denominator } = fraction

  if (numerator === 0 || denominator === 0) {
    return { numerator, denominator }
  }

  const gcd = greatestCommonDivisor(numerator, denominator)

  if (gcd !== 1) {
    steps.push({
      math: `=\\frac{${numerator} \\div ${gcd}}{${denominator} \\div ${gcd}}`,
      explanation:
        "Murtoluku tulee sieventää yksinkertaisimpaan muotoon supistamalla. " +
        "Supistamiseen on useampi eri tapa olemassa. Yksi tapa on etsiä suurin yhteinen tekijä. " +
        "Suurimmalla yhteisellä tekijällä tarkoitetaan suurinta lukua, " +
        "jolla voidaan jakaa yläkerta (osoittaja) ja alakerta (nimittäjä). ",
    })
    const simplifiedNumerator = numerator / gcd
    const simplifiedDenominator = denominator / gcd

    steps.push({
      math: `=\\frac{${simplifiedNumerator}}{${simplifiedDenominator}}`,
    })

    if (simplifiedDenominator === 1) {
      steps.push({
        math: `=${simplifiedNumerator}`,
      })
      return simplifiedNumerator
    }

    return {
      numerator: simplifiedNumerator,
      denominator: simplifiedDenominator,
    }
  }

  return {
    numerator,
    denominator,
  }
}

export const fractionDivisionByZero = (
  denominator: number,
  steps: Step[]
): boolean => {
  if (denominator === 0) {
    steps.push({
      math: `=määrittelemätön`,
      explanation: "Nollalla jakamista ei ole määritelty",
    })
    return true
  }
  return false
}

export const fractionIsZero = (fraction: Fraction, steps: Step[]): boolean => {
  const { numerator, denominator } = fraction

  if (numerator === 0 && denominator !== 0) {
    steps.push({
      math: `=0`,
    })
    return true
  }
  return false
}

export const expandFractionsToHaveSameDenominator = (
  fractionA: Fraction,
  fractionB: Fraction,
  steps: Step[]
): { expandedFractionA: Fraction; expandedFractionB: Fraction } => {
  const { numerator: aNumerator, denominator: aDenominator } = fractionA
  const { numerator: bNumerator, denominator: bDenominator } = fractionB

  if (
    aNumerator === 0 ||
    aDenominator === 0 ||
    bNumerator === 0 ||
    bDenominator === 0
  ) {
    return { expandedFractionA: fractionA, expandedFractionB: fractionB }
  }

  if (aDenominator !== bDenominator) {
    const expandedFractionA: Fraction = {
      numerator: aNumerator * bDenominator,
      denominator: aDenominator * bDenominator,
    }

    const expandedFractionB: Fraction = {
      numerator: bNumerator * aDenominator,
      denominator: bDenominator * aDenominator,
    }
    steps.push(
      {
        math:
          `\\frac{${aNumerator}*${bDenominator}}{${aDenominator}*${bDenominator}} + ` +
          `\\frac{${bNumerator}*${aDenominator}}{${bDenominator}*${aDenominator}}`,
        explanation:
          "Ennen kuin murtoluvut voidaan laskea yhteen, pitää ne laventaa samannimisiksi. " +
          "Samannimisyys tarkoittaa, että molempien lukujen nimittäjät (alakerrat) ovat samoja. " +
          'Laventaminen samannimisiksi tapahtuu kertomalla murtoluvut "ristiin" toistensa nimittäjillä.',
      },
      {
        math: `\\frac{${expandedFractionA.numerator}}{${expandedFractionA.denominator}} + \\frac{${expandedFractionB.numerator}}{${expandedFractionB.denominator}}`,
      }
    )

    return { expandedFractionA, expandedFractionB }
  }

  return { expandedFractionA: fractionA, expandedFractionB: fractionB }
}
