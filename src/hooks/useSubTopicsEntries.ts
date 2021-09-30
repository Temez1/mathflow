import useCategories from "./useCategories"

export default (categoryKey: string, topicKey: string) => {
  const categories = useCategories()

  if (categories === null) {
    return null
  }

  const category = categories.get(categoryKey)

  if (category === undefined) {
    console.error("Can't find category with key", categoryKey)
    return null
  }

  const topic = category.topics.get(topicKey)

  if (topic === undefined) {
    console.error("Can't find topic with key", topicKey)
    return null
  }

  return [...topic.subTopics]
}
