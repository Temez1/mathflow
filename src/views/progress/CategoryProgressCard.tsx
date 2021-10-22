import { Flex, Heading, Box } from "@chakra-ui/react"

import { useState } from "react"
import Card from "../../sharedComponents/Card"
import RotatingChevron from "../../sharedComponents/RotatingChevron"
import TopicProgressCard from "./TopicProgressCard"

export interface CategoryProgressCardProps {
  category: Category
}

export default (props: CategoryProgressCardProps) => {
  const { category } = props
  const [showCard, setShowCard] = useState(true)
  const topics = [...category.topics.values()]

  return (
    <Card>
      <Flex
        justify="space-between"
        align="center"
        onClick={() => setShowCard(!showCard)}
      >
        <Heading>{category.name}</Heading>
        <RotatingChevron up={showCard} />
      </Flex>
      <Box pt="2">
        {showCard ? (
          topics.map((topic) => (
            <Box pt="4" key={topic.name}>
              <TopicProgressCard topic={topic} />
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
    </Card>
  )
}
