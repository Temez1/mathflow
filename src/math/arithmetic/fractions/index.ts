import multiplyChallenge from "./multiply"
import SkillLevel from "../../SkillLevel"
import inputGuidance from "./inputGuidance"
import divideChallenge from "./divide"
import sumChallenge from "./sum"
import substractChallenge from "./substract"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("multiply", {
  name: "Kertolasku",
  getChallenge: multiplyChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance,
})

subTopics.set("divide", {
  name: "Jakolasku",
  getChallenge: divideChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance,
})

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sumChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance,
})

subTopics.set("substract", {
  name: "Vähennyslasku",
  getChallenge: substractChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance,
})

export default subTopics
