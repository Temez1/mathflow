import sum from "./sum"

const subTopics: SubTopic[] = [
  {
    name: "Yhteenlasku",
    getChallenge: sum.getChallenge,
    getCurrentSkillLevel: sum.getSkillLevel,
  },
]

export default subTopics
