import SkillLevel from "../../SkillLevel"
import basicsChallenge from "./basics"
import rootChallenge from "./root"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("basics", {
  name: "Perusteet",
  getChallenge: basicsChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("root", {
  name: "Juuri",
  getChallenge: rootChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
