import exponent from "./exponent"
import SkillLevel from "../../SkillLevel"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("exponent", {
  name: "exponent",
  getChallenge: exponent.getChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
