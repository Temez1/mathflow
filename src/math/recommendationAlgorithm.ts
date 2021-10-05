export type AllDone = null

export const ALL_DONE: AllDone = null

export interface SubTopicWithPath {
  subTopic: SubTopic
  categoryKey: string
  topicKey: string
  subTopicKey: string
}

export default async (
  categories: Categories
): Promise<SubTopicWithPath | AllDone> => {
  for (const [categoryKey, category] of categories) {
    for (const [topicKey, topic] of category.topics) {
      const { subTopics } = topic

      for (const [subTopicKey, subTopic] of subTopics) {
        const currentSkillLevel = subTopic.skillLevel.getSkillLevel()
        if (
          currentSkillLevel === "unknown" ||
          currentSkillLevel === "beginner"
        ) {
          return { subTopic, categoryKey, topicKey, subTopicKey }
        }
      }

      for (const [subTopicKey, subTopic] of subTopics) {
        const currentSkillLevel = subTopic.skillLevel.getSkillLevel()
        if (currentSkillLevel === "skilled") {
          return { subTopic, categoryKey, topicKey, subTopicKey }
        }
      }
    }
  }
  return ALL_DONE
}
