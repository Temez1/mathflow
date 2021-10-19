import { Box, Flex, Heading, Icon, Progress } from "@chakra-ui/react"
import { MdChevronRight } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useTopicsEntries from "../../../hooks/useTopicsEntries"
import AppBar from "../../../layouts/app/AppBar"
import CardsLayout from "../../../layouts/CardsLayout"
import Card from "../../../sharedComponents/Card"
import Loading from "../../../sharedComponents/Loading"
import Error from "../../../sharedComponents/Error"
import { calculateTopicProgressPercentage } from "./utils"

export default () => {
  const navigate = useNavigate()
  const { categoryKey } = useParams()

  if (categoryKey === undefined) {
    console.error("Category key missing")
    return <Error text="Jotain meni pahasti pieleen" />
  }

  const { topicEntries, state } = useTopicsEntries(categoryKey)
  if (state === "Running") {
    return <Loading text="Haetaan aihealueita" />
  }
  if (state === "Error" || topicEntries === null) {
    return <Error text="Aihealueita ei löytynyt. Yritä päivittää sivu." />
  }

  return (
    <>
      <AppBar navigateBackTo="/" />
      <CardsLayout withAppBar>
        {topicEntries.map(([key, topic]) => (
          <Card
            key={topic.name}
            onClickHandler={() => navigate(`/${categoryKey}/${key}`)}
          >
            <Flex justify="space-between" align="center">
              <Heading display="inline" size="lg">
                {topic.name}
              </Heading>
              <Icon boxSize="10" as={MdChevronRight} />
            </Flex>
            <Box pt="2">
              <Progress
                rounded="md"
                value={calculateTopicProgressPercentage([
                  ...topic.subTopics.values(),
                ])}
                colorScheme="green"
              />
            </Box>
          </Card>
        ))}
      </CardsLayout>
    </>
  )
}
