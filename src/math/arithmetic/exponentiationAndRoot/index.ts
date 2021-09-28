import exponentiationChallenge from "./exponentiation"
import SkillLevel from "../../SkillLevel"
import squareRootChallenge from "./squareRoot"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("exponent", {
  name: "Potenssi",
  getChallenge: exponentiationChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("squareRoot", {
  name: "Neliöjuuri",
  getChallenge: squareRootChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
