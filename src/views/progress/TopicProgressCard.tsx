import { Flex, Heading, Box, Progress } from "@chakra-ui/react"

import { useState } from "react"
import Card from "../../sharedComponents/Card"
import SubTopicProgress from "./SubTopicProgress"
import RotatingChevron from "../../sharedComponents/RotatingChevron"

const calculateTopicProgressPercentage = (subTopics: SubTopic[]): number => {
  let subTopicsTotalProgressionPercentage = 0
  subTopics.forEach((subTopic) => {
    subTopicsTotalProgressionPercentage +=
      subTopic.skillLevel.getSkillLevelPercentage()
  })

  const topicProgression =
    subTopicsTotalProgressionPercentage / (subTopics.length * 100)

  return topicProgression * 100
}

export interface TopicProgressCardProps {
  topic: Topic
}

export default (props: TopicProgressCardProps) => {
  const { topic } = props
  const [showCard, setShowCard] = useState(false)
  const subTopics = [...topic.subTopics.values()]

  return (
    <Card onClickHandler={() => setShowCard(!showCard)}>
      <Flex justify="space-between">
        <Heading size="md">{topic.name}</Heading>
        <RotatingChevron up={showCard} />
      </Flex>
      <Box pt="2">
        <Progress
          rounded="md"
          value={calculateTopicProgressPercentage(subTopics)}
          colorScheme="green"
        />
      </Box>
      <Box pt="2">
        {showCard ? (
          subTopics.map((subtopic) => (
            <SubTopicProgress key={subtopic.name} subTopic={subtopic} />
          ))
        ) : (
          <></>
        )}
      </Box>
    </Card>
  )
}
