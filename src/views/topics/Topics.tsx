import { Flex, Heading, Icon } from "@chakra-ui/react"
import { MdChevronRight } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import useTopicsEntries from "../../hooks/useTopicsEntries"
import AppBar from "../../layouts/app/AppBar"
import CardsLayout from "../../layouts/CardsLayout"
import Card from "../../sharedComponents/Card"

export default () => {
  const navigate = useNavigate()
  const { categoryKey } = useParams()

  if (categoryKey === undefined) {
    console.error("Category key missing")
    return <></>
  }

  const topicsEntries = useTopicsEntries(categoryKey)

  if (topicsEntries === null) {
    return <></>
  }

  return (
    <>
      <AppBar />
      <CardsLayout withAppBar>
        {topicsEntries.map(([key, topic]) => (
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
          </Card>
        ))}
      </CardsLayout>
    </>
  )
}
