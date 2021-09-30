import { Heading } from "@chakra-ui/react"

import HeaderLayout from "../../layouts/app/HeaderLayout"
import CardsLayout from "../../layouts/CardsLayout"
import TopicProgressCard from "./TopicProgressCard"

import useCategories from "../../hooks/useCategories"

export default () => {
  const categories = useCategories()

  if (categories === null) {
    return <></>
  }

  return (
    <>
      <HeaderLayout>
        <Heading size="xl">Edistyminen</Heading>
      </HeaderLayout>
      <CardsLayout>
        {[...categories].map(([, category]) =>
          [...category.topics].map(([, topic]) => (
            <TopicProgressCard key={topic.name} topic={topic} />
          ))
        )}
      </CardsLayout>
    </>
  )
}
