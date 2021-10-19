import { getRandomInt } from "../../utils"

export default (currentSkillLevel: SkillLevels): Challenge => {
  const steps: Steps = []
  let descriptionLatex = ""
  let answers: Latex[] | undefined = []

  if (currentSkillLevel === "unknown" || currentSkillLevel === "beginner") {
    const amountOfVariables = getRandomInt(2, 6)

    descriptionLatex = `${"x+".repeat(amountOfVariables - 1)}x`

    steps.push({
      math: `=${amountOfVariables}*x = ${amountOfVariables}x`,
      explanation:
        "Muuttuja symboloi (kuvaa tai edustaa) tuntematonta. " +
        "Muuttujaan pätee samat laskusäännöt kuin lukuihin. " +
        "Kertomerkki jätetään merkitsemättä, nopeamman kirjoittamisen takia. " +
        "Tämä on yleisesti hyväksytty tapa.",
    })
    answers = [`${amountOfVariables}x`]
  } else if (currentSkillLevel === "skilled") {
    const a = getRandomInt(1, 10)
    const b = getRandomInt(1, 10)
    const c = getRandomInt(1, 10)
    const d = getRandomInt(1, 10)

    descriptionLatex = `${a}x+${b}x^2+${c}x+${d}`

    steps.push(
      {
        math: `${a}x+${c}x+${b}x^2+${d}`,
        explanation:
          "Yhteenlaskuihin pätee vaihdantalaki. Vaihdantalaki tarkoittaa, että voidaan vaihtaa termien paikkaa. " +
          "Ei ole siis väliä, missä järjestyksessä teet yhteenlaskun. Päädyt aina samaan lopputulokseen.",
      },
      {
        math: `=${a + c}x+${b}x^2+${d}`,
        explanation:
          'Vain samankaltaiset termit lasketaan yhteen. Googlaa "termi matematiikka" termin määritelmälle. ' +
          "Samankaltainen tarkoittaa muuttujia, joiden eksponentti on sama.",
      },
      {
        math: `=${b}x^2+${a + c}x+${d}`,
        explanation:
          "Luulit varmaan, että oltiin jo valmiita. Pahoittelut tästä viimeisestä välivaiheesta. " +
          "Tehdään pieni sopimus. Tai no teknisesti ottaen sinulla ei ole vaihtoehtoja :D. Sovitaan, " +
          "että järjestetään termit aina seuraavasti. Ensin tulee muuttujat, suurimmasta exponentista pienimpään " +
          "ja lopuksi luvut. Mahdat miettiä miksi ihmeessä? Ensinnäkin, minun ei tarvitse kirjoittaa kaikkia eri " +
          "vastausvaihtoehtoja erikseen (laiskuus). Toiseksi, tästä järjestelmällisyydestä saattaa olla jopa " +
          "hyötyä sinullekkin jatkossa vaikeampien tehtävien kohdalla.",
      }
    )
    answers = [`${b}x^2+${a + c}x+${d}`]
  } else if (currentSkillLevel === "pro") {
    const a = getRandomInt(1, 10)
    const b = getRandomInt(1, 10)
    const c = getRandomInt(1, 10)
    const d = getRandomInt(1, 10)

    descriptionLatex = `${a}x+${b}x^2+${c}x+${d}`

    steps.push(
      {
        math: `${a}x+${c}x+${b}x^2+${d}`,
        explanation:
          "Yhteenlaskuihin pätee vaihdantalaki. Vaihdantalaki tarkoittaa, että voidaan vaihtaa termien paikkaa. " +
          "Ei ole siis väliä, missä järjestyksessä teet yhteenlaskun. Päädyt aina samaan lopputulokseen.",
      },
      {
        math: `=${a + c}x+${b}x^2+${d}`,
        explanation:
          'Vain samankaltaiset termit lasketaan yhteen. Googlaa "termi matematiikka" termin määritelmälle. ' +
          "Samankaltainen tarkoittaa muuttujia, joiden eksponentti on sama.",
      },
      {
        math: `=${b}x^2+${a + c}x+${d}`,
        explanation:
          "Luulit varmaan, että oltiin jo valmiita. Pahoittelut tästä viimeisestä välivaiheesta. " +
          "Tehdään pieni sopimus. Tai no teknisesti ottaen sinulla ei ole vaihtoehtoja :D. Sovitaan, " +
          "että järjestetään termit aina seuraavasti. Ensin tulee muuttujat, suurimmasta exponentista pienimpään " +
          "ja lopuksi luvut. Mahdat miettiä miksi ihmeessä? Ensinnäkin, minun ei tarvitse kirjoittaa kaikkia eri " +
          "vastausvaihtoehtoja erikseen (laiskuus). Toiseksi, tästä järjestelmällisyydestä saattaa olla jopa " +
          "hyötyä sinullekkin jatkossa vaikeampien tehtävien kohdalla.",
      }
    )
    answers = [`${b}x^2+${a + c}x+${d}`]
  }

  return {
    description: "Sievennä",
    descriptionLatex,
    steps,
    answers,
  }
}
