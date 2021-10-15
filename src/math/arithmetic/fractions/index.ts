import multiplyChallenge from "./multiply"
import SkillLevel from "../../SkillLevel"
import inputGuidance from "./inputGuidance"
import divideChallenge from "./divide"
import sumChallenge from "./sum"

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

export default subTopics
