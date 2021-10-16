type Latex = string

type NameLowerCamelCase = string

type SkillLevels = import("./SkillLevel").SkillLevels

type Categories = Map<NameLowerCamelCase, Category>
interface Step {
  math: Latex
  explanation?: string
}

interface Challenge {
  description: string
  descriptionLatex?: Latex
  steps: Step[]
  answers: Latex[] | undefined
}

interface InputGuidanceTextAndKeys {
  text: string
  keyboardKeys?: {
    keyboardKey: string
    combiner?: string
  }[]
}

interface InputGuidance {
  desktop: InputGuidanceTextAndKeys[]
  mobile?: InputGuidanceTextAndKeys[]
}

interface SubTopic {
  name: string
  getChallenge: (currentSkillLevel: SkillLevels) => Challenge
  skillLevel: import("./SkillLevel").default
  inputGuidance?: InputGuidance
}

interface Topic {
  name: string
  subTopics: Map<NameLowerCamelCase, SubTopic>
}

interface Category {
  name: string
  topics: Map<NameLowerCamelCase, Topic>
}
