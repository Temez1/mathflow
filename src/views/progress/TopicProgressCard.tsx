import { Flex, Heading, Box, Icon, Progress } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { MdExpandMore } from "react-icons/md"
import Card from "../../sharedComponents/Card"
import SubTopicProgress from "./SubTopicProgress"

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

  const chevronIconRotationDuration = 0.3

  return (
    <Card onClickHandler={() => setShowCard(!showCard)}>
      <Flex justify="space-between">
        <Heading size="md">{topic.name}</Heading>
        <motion.div
          variants={{
            open: {
              rotate: 0,
              transition: { duration: chevronIconRotationDuration },
            },
            close: {
              rotate: 180,
              transition: { duration: chevronIconRotationDuration },
            },
          }}
          animate={showCard ? "close" : "open"}
        >
          <Icon boxSize="8" as={MdExpandMore} />
        </motion.div>
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
