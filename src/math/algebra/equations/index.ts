import SkillLevel from "../../SkillLevel"
import linearOneVariableChallenge from "./linearOneVariable"
import fractionGuidance from "../../inputGuidance/fraction"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("linearOneVariable", {
  name: "Ensimmäisen asteen yhtälö",
  getChallenge: linearOneVariableChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance: fractionGuidance,
})

export default subTopics
