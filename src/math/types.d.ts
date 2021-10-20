type Latex = string

type NameLowerCamelCase = string

type SkillLevels = import("./SkillLevel").SkillLevels

type Categories = Map<NameLowerCamelCase, Category>

type Steps = Step[]

interface Step {
  math: Latex
  explanation?: string
}

type Answers = Answer[]
interface Answer {
  terms: Latex[]
}

interface Challenge {
  description: string
  descriptionLatex?: Latex
  steps: Steps
  answers: Answers | undefined
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
