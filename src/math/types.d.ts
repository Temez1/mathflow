type SkillLevel = "unknown" | "beginner" | "skilled" | "pro" | "expert"

interface Challenge {
  description: string
  steps: string
  skillLevel: SkillLevel
}

interface SubTopic {
  name: string
  challenge: Challenge
}

interface Topic {
  name: string
  subTopics: [SubTopic]
}

interface Category {
  name: string
  topics: [Topic]
}
