import { Flex, Heading, Box, Icon, Progress } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { MdExpandMore } from "react-icons/md"
import Card from "../../../sharedComponents/Card"
import SubTopicProgress from "./SubTopicProgress"

export interface TopicProgressCardProps {
  topic: Topic
}

export default (props: TopicProgressCardProps) => {
  const { topic } = props
  const [showCard, setShowCard] = useState(false)

  return (
    <Card onClickHandler={() => setShowCard(!showCard)}>
      <Flex justify="space-between">
        <Heading size="md">{topic.name}</Heading>
        <motion.div
          variants={{
            open: { rotate: 0, transition: { duration: 0.5 } },
            close: { rotate: 180, transition: { duration: 0.5 } },
          }}
          animate={showCard ? "close" : "open"}
        >
          <Icon boxSize="8" as={MdExpandMore} />
        </motion.div>
      </Flex>
      <Box pt="2">
        <Progress rounded="md" value={40} colorScheme="green" />
      </Box>
      <Box pt="2">
        {showCard ? (
          [...topic.subTopics].map(([, subtopic]) => (
            <SubTopicProgress key={subtopic.name} subTopic={subtopic} />
          ))
        ) : (
          <></>
        )}{" "}
      </Box>
    </Card>
  )
}
