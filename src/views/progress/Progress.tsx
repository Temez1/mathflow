import { Heading } from "@chakra-ui/react"

import { useEffect, useState } from "react"
import AppBarLayout from "../../layouts/app/AppBarLayout"
import CardsLayout from "../../layouts/CardsLayout"
import TopicProgressCard from "./topicProgressCard/TopicProgressCard"
import Categories from "../../math/Categories"

export default () => {
  const [categories, setCategories] = useState<Categories | null>(null)

  const initCategories = async () => {
    const c = await Categories
    setCategories(c)
  }

  useEffect(() => {
    initCategories()
  })

  if (categories === null) {
    return <></>
  }

  return (
    <>
      <AppBarLayout>
        <Heading size="xl">Edistyminen</Heading>
      </AppBarLayout>
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
