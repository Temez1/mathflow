import { Flex, Heading, Text, Icon, Progress } from "@chakra-ui/react"
import { MdChevronRight } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useSubTopicsEntries from "../../../../hooks/useSubTopicsEntries"
import AppBar from "../../../../layouts/app/AppBar"
import CardsLayout from "../../../../layouts/CardsLayout"
import Card from "../../../../sharedComponents/Card"
import Loading from "../../../../sharedComponents/Loading"
import Error from "../../../../sharedComponents/Error"

export interface SubTopicViewNavigateState {
  mode: LearningSessionMode
  categoryKey: string
  topicKey: string
  subTopicKey: string
}

export default () => {
  const navigate = useNavigate()
  const { categoryKey, topicKey } = useParams()

  if (categoryKey === undefined) {
    console.error("Category key missing")
    return <></>
  }

  if (topicKey === undefined) {
    console.error("Topic key missing")
    return <></>
  }

  const { subTopicEntries, state } = useSubTopicsEntries(categoryKey, topicKey)

  if (state === "Running") {
    return <Loading text="Haetaan aihealueita" />
  }
  if (state === "Error" || subTopicEntries === null) {
    return <Error text="Aihealueita ei löytynyt. Yritä päivittää sivu." />
  }

  return (
    <>
      <AppBar navigateBackTo={`/${categoryKey}`} />
      <CardsLayout withAppBar>
        {subTopicEntries.map(([subTopicKey, subTopic]) => (
          <Card
            key={subTopic.name}
            onClickHandler={() =>
              navigate(`/learning`, {
                state: {
                  mode: "linear" as LearningSessionMode,
                  categoryKey,
                  topicKey,
                  subTopicKey,
                },
              })
            }
          >
            <Flex justify="space-between" align="center">
              <Heading display="inline" size="lg">
                {subTopic.name}
              </Heading>
              <Icon boxSize="10" as={MdChevronRight} />
            </Flex>
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
          </Card>
        ))}
      </CardsLayout>
    </>
  )
}
