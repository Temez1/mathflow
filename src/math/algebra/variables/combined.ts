import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Answers | undefined = []
  const a = getRandomInt(1, 4)
  const b = getRandomInt(2, 4)
  const c = getRandomInt(1, 4)
  const d = getRandomInt(1, 4)
  const e = getRandomInt(1, 4)

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    descriptionLatex = `${a}x^2+${b}x+${c}x*${d}x+${e}`

    steps.push(
      {
        math: `=${a}x^2+${b}x+${c * d}x^2+${e}`,
        explanation: "Kertolasku lasketaan ennen yhteenlaskua.",
      },
      {
        math: `=${a}x^2+${c * d}x^2+${b}x+${e}`,
        explanation:
          "Järjestetään samankaltaiset termit vierekkäin (yhteenlaskujen vaihdantalaki).",
      },
      {
        math: `=${a + c * d}x^2+${b}x+${e}`,
        explanation:
          "Lisätään samankaltaiset termit yhteen. Molemmilla x:illä on sama eksponentti, " +
          "joten ne ovat samankaltaiset.",
      }
    )

    answers = [{ terms: [`${a + c * d}x^2+${b}x+${e}`] }]
  } else if (currentSkillLevel === "skilled") {
    descriptionLatex = `(${a}x+${b}*${c}x)*(${d}x+${e})`

    steps.push(
      {
        math: `(${a}x+${b * c}x)*(${d}x+${e})`,
        explanation:
          "Lasketaan suluissa olevat laskut ensin. Aloitetaan kertolaskusta.",
      },
      {
        math: `${a + b * c}x*(${d}x+${e})`,
        explanation: "Lasketaan samankaltaiset termit yhteen.",
      },
      {
        math: `${a + b * c}x*${d}x+${a + b * c}x*${e}`,
        explanation:
          "Sulut avataan kertomalla sulkujen sisässä olevat termit sulkujen edessä olevalla termillä.",
      },
      {
        math: `${(a + b * c) * d}x^2+${(a + b * c) * e}x`,
      }
    )
    answers = [{ terms: [`${(a + b * c) * d}x^2+${(a + b * c) * e}x`] }]
  } else if (currentSkillLevel === "pro") {
    descriptionLatex = `(${a}x+${b}*${c}x)*(${d}x+${e})`

    steps.push(
      {
        math: `(${a}x+${b * c}x)*(${d}x+${e})`,
        explanation:
          "Lasketaan suluissa olevat laskut ensin. Aloitetaan kertolaskusta.",
      },
      {
        math: `${a + b * c}x*(${d}x+${e})`,
        explanation: "Lasketaan samankaltaiset termit yhteen.",
      },
      {
        math: `${a + b * c}x*${d}x+${a + b * c}x*${e}`,
        explanation:
          "Sulut avataan kertomalla sulkujen sisässä olevat termit sulkujen edessä olevalla termillä.",
      },
      {
        math: `${(a + b * c) * d}x^2+${(a + b * c) * e}x`,
      }
    )
    answers = [{ terms: [`${(a + b * c) * d}x^2+${(a + b * c) * e}x`] }]
  }

  return {
    description: "Sievennä",
    descriptionLatex,
    steps,
    answers,
  }
}
