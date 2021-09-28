import SkillLevel from "../../SkillLevel"
import divideChallenge from "./divide"
import multiplyChallenge from "./multiply"
import substractChallenge from "./substract"
import sumChallenge from "./sum"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sumChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("substract", {
  name: "Vähennyslasku",
  getChallenge: substractChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("multiply", {
  name: "Kertolasku",
  getChallenge: multiplyChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("divide", {
  name: "Jakolasku",
  getChallenge: divideChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
