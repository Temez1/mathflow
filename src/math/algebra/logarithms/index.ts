import SkillLevel from "../../SkillLevel"
import basicsChallenge from "./basics"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("basics", {
  name: "Perusteet",
  getChallenge: basicsChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
