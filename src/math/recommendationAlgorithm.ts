import categories from "./categories"

export type AllDone = null

export const ALL_DONE: AllDone = null

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
  return ALL_DONE
}
