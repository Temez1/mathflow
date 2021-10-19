import { useCategories } from "../../ContextProviders/CategoriesContextProvider"

import CardsLayout from "../../layouts/CardsLayout"
import Loading from "../../sharedComponents/Loading"
import Error from "../../sharedComponents/Error"
import CategoryProgressCard from "./CategoryProgressCard"

export default () => {
  const { categories, state: categoriesState } = useCategories()

  if (categoriesState === "Running") {
    return <Loading text="Etsitään taitotasoja arkistojen kätköistä" />
  }

  if (categoriesState === "Error" || categories === null) {
    return <Error text="Taitotasoja ei löytynyt. Yritä päivittää sivu." />
  }
  return (
    <CardsLayout>
      {[...categories].map(([, category]) => (
        <CategoryProgressCard key={category.name} category={category} />
      ))}
    </CardsLayout>
  )
}
