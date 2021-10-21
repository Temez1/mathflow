import sumChallenge from "./sum"
import SkillLevel from "../../SkillLevel"
import multiplyChallenge from "./multiply"
import exponentiationGuidance from "../../inputGuidance/exponentiation"
import combinedChallenge from "./combined"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sumChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("multiply", {
  name: "Kertolasku",
  getChallenge: multiplyChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance: exponentiationGuidance,
})

subTopics.set("combined", {
  name: "Yhdistettynä",
  getChallenge: combinedChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance: exponentiationGuidance,
})

export default subTopics
