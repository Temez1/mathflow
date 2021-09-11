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

const categories: [Category] = [
  {
    name: "Aritmetiikka",
    topics: [
      {
        name: "Perusoperaatiot",
        subTopics: [
          {
            name: "Yhteenlasku",
            challenge: {
              description: "Laske",
              steps: "something",
              skillLevel: "unknown",
            },
          },
        ],
      },
    ],
  },
]

export default categories
