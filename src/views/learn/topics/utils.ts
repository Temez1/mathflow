// eslint-disable-next-line import/prefer-default-export
export const calculateTopicProgressPercentage = (
  subTopics: SubTopic[]
): number => {
  let subTopicsTotalProgressionPercentage = 0
  subTopics.forEach((subTopic) => {
    subTopicsTotalProgressionPercentage +=
      subTopic.skillLevel.getSkillLevelPercentage()
  })

  const topicProgression =
    subTopicsTotalProgressionPercentage / (subTopics.length * 100)

  return topicProgression * 100
}
