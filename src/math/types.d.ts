type SkillLevel = "unknown" | "beginner" | "skilled" | "pro" | "expert"

interface Step {
  latex: string
  explanation?: string
}

interface Challenge {
  description: string
  descriptionLatex?: string
  steps: Step[]
  answerLatex: string
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
