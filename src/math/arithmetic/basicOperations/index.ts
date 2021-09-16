import substract from "./substract"
import sum from "./sum"

const subTopics: SubTopic[] = [
  {
    name: "Yhteenlasku",
    getChallenge: sum.getChallenge,
    getCurrentSkillLevel: sum.getSkillLevel,
  },
  {
    name: "Vähennyslasku",
    getChallenge: substract.getChallenge,
    getCurrentSkillLevel: substract.getSkillLevel,
  },
]

export default subTopics
