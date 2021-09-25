type SkillLevel = "unknown" | "beginner" | "skilled" | "pro" | "expert"

type Latex = string

type NameLowerCamelCase = string

interface Step {
  math: Latex
  explanation?: string
}

interface Challenge {
  description: string
  descriptionLatex?: Latex
  steps: Step[]
  answers: Latex[] | string[]
}

interface SubTopic {
  name: string
  getChallenge: () => Challenge
  getCurrentSkillLevel: () => SkillLevel
  updateSkillLevel: (newSkillLevel: SkillLevel) => void
}

interface Topic {
  name: string
  subTopics: Map<NameLowerCamelCase, SubTopic>
}

interface Category {
  name: string
  topics: Map<NameLowerCamelCase, Topic>
}
