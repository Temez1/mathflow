type SkillLevel = "unknown" | "beginner" | "skilled" | "pro" | "expert"

type Latex = string

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
}

interface Topic {
  name: string
  subTopics: SubTopic[]
}

interface Category {
  name: string
  topics: Topic[]
}
