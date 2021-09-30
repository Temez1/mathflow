import useCategories from "./useCategories"

export default (categoryKey: string) => {
  const categories = useCategories()

  if (categories === null) {
    return null
  }

  const category = categories.get(categoryKey)

  if (category === undefined) {
    console.error("Can't find category with key", categoryKey)
    return null
  }

  return [...category.topics]
}
