import { Heading } from "@chakra-ui/react"
import { useCategories } from "../../ContextProviders/CategoriesContextProvider"

import HeaderLayout from "../../layouts/app/HeaderLayout"
import CardsLayout from "../../layouts/CardsLayout"
import Loading from "../../sharedComponents/Loading"
import Error from "../../sharedComponents/Error"
import TopicProgressCard from "./TopicProgressCard"

export default () => {
  const { categories, state: categoriesState } = useCategories()

  if (categoriesState === "Running") {
    return <Loading text="Etsitään taitotasoja arkistojen kätköistä" />
  }

  if (categoriesState === "Error" || categories === null) {
    return <Error text="Taitotasoja ei löytynyt. Yritä päivittää sivu." />
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
