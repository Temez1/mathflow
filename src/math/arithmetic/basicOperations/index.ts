import divide from "./divide"
import multiply from "./multiply"
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
  {
    name: "Kertolasku",
    getChallenge: multiply.getChallenge,
    getCurrentSkillLevel: multiply.getSkillLevel,
  },
  {
    name: "Jakolasku",
    getChallenge: divide.getChallenge,
    getCurrentSkillLevel: divide.getSkillLevel,
  },
]

export default subTopics
