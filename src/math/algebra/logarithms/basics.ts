import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []

  let description = ""
  let descriptionLatex = ""
  let answers: Answers = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    description = "Ratkaise x"
    const base = getRandomInt(2, 5)
    const x = getRandomInt(2, 3)
    const antiLog = base ** x

    descriptionLatex = `${base}^x=${antiLog}`

    steps.push(
      {
        math: `${base}^x=${antiLog}`,
        explanation:
          `Toisin sanoen, kuinka monta kertaa ` +
          `kantaluku ${base} tulee kertoa itsellään, että saadaan vastaukseksi ${antiLog}?`,
      },
      {
        math: `${`${base} \\cdot`.repeat(
          x - 1
        )} ${base} = ${base}^${x}=${antiLog}`,
        explanation: `Kantalukua kerrotaan itsellään yhteensä ${x} kertaa, jotta yhtälö toteutuu.`,
      },
      {
        math: `x=${x}`,
      }
    )

    answers = [`x=${x}`, `${x}`]
  } else if (currentSkillLevel === "skilled" || currentSkillLevel === "pro") {
    description =
      "Ratkaise x käyttäen logaritmifunktiota, jotta osaat käyttää sitä jatkossa."
    const base = getRandomInt(2, 5)
    const x = getRandomInt(2, 3)
    const antiLog = base ** x

    descriptionLatex = `${base}^x=${antiLog}`

    steps.push(
      {
        math: `${base}^x=${antiLog}`,
        explanation:
          "Kysymys on sama, mutta käytetään ratkaisemiseen logaritmifunktiota. Samalla tavalla kuin toisen " +
          "potenssin ratkaisemiseen käytetään neliöjuurta, potenssiyhtälön ratkaisemiseen käytetään logaritmia.",
      },
      {
        math: `\\log_${base}(${base}^x) = \\log_${base}(${antiLog}) \\quad || \\enspace log_${base}()`,
        explanation:
          `Otetaan ${base} kantainen logaritmi molemmilta puolilta yhtälöä. Logaritmin kantaluku on ` +
          "tarkoituksella sama kuin potenssin kantaluku.",
      },

      {
        math: `x \\cdot \\log_${base}(${base}) = \\log_${base}(${antiLog}) `,
        explanation:
          "Logaritmeja käytettäessä, voidaan potenssilasku muuttaa kertolaskuksi. Tämän ansiosta " +
          "potenssiyhtälöjen ratkaiseminen onnistuu logaritmifunktion avulla.",
      },

      {
        math: `x \\cdot 1 = \\log_${base}(${antiLog})`,
        explanation:
          "Kun logaritmin kantaluku ja sulkujen sisässä oleva luku ovat samat, logaritmi sievenee " +
          "ykköseksi samaan tapaan kuin luvun jakaminen itsellään (esim. 5÷5=1).",
      },
      {
        math: `x = \\log_${base}(${base}^${x}), \\quad \\text{koska} \\enskip ${antiLog} = ${base}^${x}`,
        explanation:
          "Toistetaan samat vaiheet yhtälön toiselle puolelle. Muutetaan luku ensin potenssilaskuksi, " +
          `jonka kantaluku on sama kuin logaritmillä.`,
      },
      {
        math: `x = ${x} \\cdot \\log_${base}(${base})`,
        explanation: "Muutetaan potenssilasku kertolaskuksi",
      },
      {
        math: `x = ${x} \\cdot 1`,
        explanation: "Sievennetään logaritmi",
      },
      {
        math: `x = ${x}`,
        explanation:
          "Tämä saattoi tuntua tarpettoman hankalalta yksinkertaiselle potenssiyhtälölle, " +
          "jonka voit ratkaista päässäsi. Jatkossa kun yhtälöt ovat vaikeampia, on hyvä osata " +
          "nämä temput logaritmifunktion kanssa.",
      }
    )

    answers = [`x=${x}`, `${x}`]
  }

  return {
    description,
    descriptionLatex,
    steps,
    answers,
  }
}
