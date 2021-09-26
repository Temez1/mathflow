import SkillLevel from "../../SkillLevel"
import divide from "./divide"
import multiply from "./multiply"
import substract from "./substract"
import sum from "./sum"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sum.getChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("substract", {
  name: "Vähennyslasku",
  getChallenge: substract.getChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("multiply", {
  name: "Kertolasku",
  getChallenge: multiply.getChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("divide", {
  name: "Jakolasku",
  getChallenge: divide.getChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
