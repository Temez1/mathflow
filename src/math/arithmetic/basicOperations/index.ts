import divide from "./divide"
import multiply from "./multiply"
import substract from "./substract"
import sum from "./sum"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sum.getChallenge,
  getCurrentSkillLevel: sum.getSkillLevel,
  updateSkillLevel: sum.updateSkillLevel,
})

subTopics.set("substract", {
  name: "Vähennyslasku",
  getChallenge: substract.getChallenge,
  getCurrentSkillLevel: substract.getSkillLevel,
  updateSkillLevel: substract.updateSkillLevel,
})

subTopics.set("multiply", {
  name: "Kertolasku",
  getChallenge: multiply.getChallenge,
  getCurrentSkillLevel: multiply.getSkillLevel,
  updateSkillLevel: multiply.updateSkillLevel,
})

subTopics.set("divide", {
  name: "Jakolasku",
  getChallenge: divide.getChallenge,
  getCurrentSkillLevel: divide.getSkillLevel,
  updateSkillLevel: divide.updateSkillLevel,
})

export default subTopics
