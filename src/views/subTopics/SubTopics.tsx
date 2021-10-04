import { Flex, Heading, Icon } from "@chakra-ui/react"
import { MdChevronRight } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useSubTopicsEntries from "../../hooks/useSubTopicsEntries"
import AppBar from "../../layouts/app/AppBar"
import CardsLayout from "../../layouts/CardsLayout"
import Card from "../../sharedComponents/Card"

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

  const subTopicsEntries = useSubTopicsEntries(categoryKey, topicKey)

  if (subTopicsEntries === null) {
    return <></>
  }

  return (
    <>
      <AppBar navigateBackTo={`/${categoryKey}`} />
      <CardsLayout withAppBar>
        {subTopicsEntries.map(([subTopicKey, subTopic]) => (
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
          </Card>
        ))}
      </CardsLayout>
    </>
  )
}
