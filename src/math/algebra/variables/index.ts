import sumChallenge from "./sum"
import SkillLevel from "../../SkillLevel"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("sum", {
  name: "Yhteenlasku",
  getChallenge: sumChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
