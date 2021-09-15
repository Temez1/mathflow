import categories from "./categories"

export type AllDone = null

const allDone = null

export default (): Challenge | AllDone => {
  for (const category of categories) {
    for (const topic of category.topics) {
      for (const subTopic of topic.subTopics) {
        const currentSkillLevel = subTopic.getCurrentSkillLevel()
        if (
          currentSkillLevel === "unknown" ||
          currentSkillLevel === "beginner"
        ) {
          return subTopic.getChallenge()
        }
      }
      for (const subTopic of topic.subTopics) {
        const currentSkillLevel = subTopic.getCurrentSkillLevel()
        if (currentSkillLevel === "skilled") {
          return subTopic.getChallenge()
        }
      }
    }
  }
  return allDone
}
