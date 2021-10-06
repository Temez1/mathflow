import parenthesesChallenge from "./parentheses"
import SkillLevel from "../../SkillLevel"
import exponentationAndSquareRootChallenge from "./exponentationAndSquareRoot"
import multiplyAndDivideChallenge from "./multiplyAndDivide"
import combinedChallenge from "./combined"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("parentheses", {
  name: "Sulut",
  getChallenge: parenthesesChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("exponentationAndSquareRoot", {
  name: "Potenssi ja neliöjuuri",
  getChallenge: exponentationAndSquareRootChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("multiplyAndDivide", {
  name: "Kerto- ja jakolasku",
  getChallenge: multiplyAndDivideChallenge,
  skillLevel: new SkillLevel(),
})

subTopics.set("combined", {
  name: "Yhdistettynä",
  getChallenge: combinedChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
