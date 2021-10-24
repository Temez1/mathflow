import { greatestCommonDivisor } from "../../utils"
import { divisionByZero } from "../basicOperations/utils"

export interface Fraction {
  numerator: number
  denominator: number
}

export interface SimplifiedFraction extends Fraction {
  sign: FractionSign
}

const fractionIsZero = (fraction: Fraction, steps: Steps): boolean => {
  const { numerator, denominator } = fraction

  if (numerator === 0 && denominator !== 0) {
    steps.push({
      math: `=0`,
    })
    return true
  }
  return false
}

const simplifyFractionSign = (
  fraction: Fraction,
  steps: Steps
): SimplifiedFraction => {
  const signedFraction: Fraction = {
    numerator: Math.abs(fraction.numerator),
    denominator: Math.abs(fraction.denominator),
  }

  if (fraction.numerator < 0 && fraction.denominator >= 0) {
    const lastStep = steps.pop()
    if (lastStep) {
      steps.push({
        math: `${lastStep?.math}=-\\frac{${signedFraction.numerator}}{${signedFraction.denominator}}`,
        explanation: lastStep.explanation,
      })
    }

    return { sign: "-", ...signedFraction }
  }
  if (fraction.denominator < 0 && fraction.numerator >= 0) {
    const lastStep = steps.pop()
    if (lastStep) {
      steps.push({
        math: `${lastStep?.math}=-\\frac{${signedFraction.numerator}}{${signedFraction.denominator}}`,
        explanation: lastStep.explanation,
      })
    }

    return { sign: "-", ...signedFraction }
  }
  if (fraction.numerator < 0 && fraction.denominator < 0) {
    const lastStep = steps.pop()
    if (lastStep) {
      steps.push({
        math: `${lastStep?.math}=\\frac{${signedFraction.numerator}}{${signedFraction.denominator}}`,
        explanation: lastStep.explanation,
      })
    }

    return { sign: "+", ...signedFraction }
  }
  return { sign: "+", ...signedFraction }
}

export const simplifyFraction = (
  fraction: Fraction,
  steps: Steps
): SimplifiedFraction | number | undefined => {
  const { numerator, denominator } = fraction

  if (divisionByZero(denominator, steps)) {
    return undefined
  }

  if (fractionIsZero(fraction, steps)) {
    return 0
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

    const signedFraction = simplifyFractionSign(
      { numerator: simplifiedNumerator, denominator: simplifiedDenominator },
      steps
    )

    if (signedFraction.denominator === 1) {
      if (signedFraction.sign === "-") {
        steps.push({
          math: `=-${signedFraction.numerator}`,
        })
        return -signedFraction.numerator
      }
      steps.push({
        math: `=${signedFraction.numerator}`,
      })
      return signedFraction.numerator
    }

    return signedFraction
  }

  const signedFraction = simplifyFractionSign({ numerator, denominator }, steps)

  if (signedFraction.denominator === 1) {
    if (signedFraction.sign === "-") {
      steps.push({
        math: `=-${signedFraction.numerator}`,
      })
      return -signedFraction.numerator
    }
    steps.push({
      math: `=${signedFraction.numerator}`,
    })
    return signedFraction.numerator
  }
  return signedFraction
}

export type ExpandFractionsOperator = "+" | "-"

export const expandFractionsToHaveSameDenominator = (
  fractionA: Fraction,
  fractionB: Fraction,
  operator: ExpandFractionsOperator,
  steps: Steps
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

    let explanation = ""

    if (operator === "+") {
      explanation =
        "Ennen yhteenlaskua, pitää murtoluvut laventaa samannimisiksi. " +
        "Samannimisyys tarkoittaa, että molempien lukujen alakerrat (nimittäjät) ovat samoja. " +
        'Laventaminen samannimisiksi tapahtuu kertomalla murtoluvut "ristiin" toistensa nimittäjillä.'
    } else if (operator === "-") {
      explanation =
        "Ennen vähennyslaskua, pitää murtoluvut laventaa samannimisiksi. " +
        "Samannimisyys tarkoittaa, että molempien lukujen alakerrat (nimittäjät) ovat samoja. " +
        'Laventaminen samannimisiksi tapahtuu kertomalla murtoluvut "ristiin" toistensa nimittäjillä.'
    }

    steps.push(
      {
        math:
          `=\\frac{${aNumerator}*${bDenominator}}{${aDenominator}*${bDenominator}} ${operator} ` +
          `\\frac{${bNumerator}*${aDenominator}}{${bDenominator}*${aDenominator}}`,
        explanation,
      },
      {
        math: `=\\frac{${expandedFractionA.numerator}}{${expandedFractionA.denominator}} ${operator} \\frac{${expandedFractionB.numerator}}{${expandedFractionB.denominator}}`,
      }
    )

    return { expandedFractionA, expandedFractionB }
  }

  return { expandedFractionA: fractionA, expandedFractionB: fractionB }
}
