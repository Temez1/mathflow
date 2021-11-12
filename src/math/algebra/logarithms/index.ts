import SkillLevel from "../../SkillLevel"
import basicsChallenge from "./basics"
import rootChallenge from "./root"

import fractionInputGuidance from "../../inputGuidance/fraction"
import exponentialEquationChallenge from "./exponentialEquation"

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
  inputGuidance: fractionInputGuidance,
})

subTopics.set("exponentialEquation", {
  name: "Eksponenttiyhtälö",
  getChallenge: exponentialEquationChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
