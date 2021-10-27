import SkillLevel from "../../SkillLevel"
import linearOneVariableChallenge from "./linearOneVariable"
import linearTwoVariablesChallenge from "./linearTwoVariables"
import quadraticChallenge from "./quadratic"

import fractionGuidance from "../../inputGuidance/fraction"
import multipleAnswersGuidance from "../../inputGuidance/multipleAnswers"
import quadraticGuidance from "../../inputGuidance/quadratic"

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
  inputGuidance: multipleAnswersGuidance,
})

subTopics.set("quadratic", {
  name: "Toisen asteen yhtälö",
  getChallenge: quadraticChallenge,
  skillLevel: new SkillLevel(),
  inputGuidance: quadraticGuidance,
})

export default subTopics
