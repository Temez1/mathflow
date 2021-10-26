import SkillLevel from "../../SkillLevel"
import linearOneVariableChallenge from "./linearOneVariable"
import linearTwoVariablesChallenge from "./linearTwoVariables"
import fractionGuidance from "../../inputGuidance/fraction"

const subTopics = new Map<NameLowerCamelCase, SubTopic>()

subTopics.set("linearOneVariable", {
  name: "Ensimmäisen asteen yhtälö",
  getChallenge: linearOneVariableChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance: fractionGuidance,
})

subTopics.set("linearTwoVariables", {
  name: "Yhtälöpari",
  getChallenge: linearTwoVariablesChallenge,
  skillLevel: new SkillLevel(),
})

export default subTopics
