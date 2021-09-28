import Categories from "./Categories"

export type AllDone = null

export const ALL_DONE: AllDone = null

export default async (): Promise<SubTopic | AllDone> => {
  const categories = await Categories
  for (const [, category] of categories) {
    for (const [, topic] of category.topics) {
      const { subTopics } = topic

      for (const [, subTopic] of subTopics) {
        const currentSkillLevel = subTopic.skillLevel.getSkillLevel()
        if (
          currentSkillLevel === "unknown" ||
          currentSkillLevel === "beginner"
        ) {
          return subTopic
        }
      }

      for (const [, subTopic] of subTopics) {
        const currentSkillLevel = subTopic.skillLevel.getSkillLevel()
        if (currentSkillLevel === "skilled") {
          return subTopic
        }
      }
    }
  }
  return ALL_DONE
}
