import { Flex, Heading, Icon } from "@chakra-ui/react"
import { MdChevronRight } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useSubTopicsEntries from "../../hooks/useSubTopicsEntries"
import AppBar from "../../layouts/app/AppBar"
import CardsLayout from "../../layouts/CardsLayout"
import Card from "../../sharedComponents/Card"

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
      <AppBar />
      <CardsLayout withAppBar>
        {subTopicsEntries.map(([, subTopic]) => (
          <Card key={subTopic.name} onClickHandler={() => navigate(`/`)}>
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
