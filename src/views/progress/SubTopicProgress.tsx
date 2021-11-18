import { Box, Text, Flex, Progress } from "@chakra-ui/react"

export interface SubTopicProgressProps {
  subTopic: SubTopic
}

export default (props: SubTopicProgressProps) => {
  const { subTopic } = props

  return (
    <Box>
      <Text fontSize="xl" display="inline">
        {subTopic.name}
      </Text>
      <Flex align="center">
        <Progress
          w="70%"
          rounded="md"
          value={subTopic.skillLevel.getSkillLevelPercentage()}
          colorScheme="green"
        />
        <Text pl="8" fontSize="lg" display="inline">
          {subTopic.skillLevel.getSkillLevelName()}
        </Text>
      </Flex>
    </Box>
  )
}
