type SkillLevel = "unknown" | "beginner" | "skilled" | "pro" | "expert"

interface Step {
  mathLatex: string
  explanation?: string
}

interface Challenge {
  description: string
  steps: Step[]
}

interface SubTopic {
  name: string
  challenge: Challenge
}

interface Topic {
  name: string
  subTopics: SubTopic[]
}

interface Category {
  name: string
  topics: Topic[]
}
