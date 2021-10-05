import { TaskState } from "firebase/firestore"
import { useState, useLayoutEffect } from "react"
import { useCategories } from "../ContextProviders/CategoriesContextProvider"

export default (categoryKey: string, topicKey: string) => {
  const { categories, state: categoriesState } = useCategories()
  const [state, setState] = useState<TaskState>("Running")
  const [subTopicEntries, setSubTopicEntries] = useState<
    [string, SubTopic][] | null
  >(null)

  useLayoutEffect(() => {
    if (categories === null) {
      return
    }
    if (categoriesState === "Error") {
      setState("Error")
      return
    }

    const category = categories.get(categoryKey)
    if (category === undefined) {
      console.error("Can't find category with key", categoryKey)
      setState("Error")
      return
    }

    const topic = category.topics.get(topicKey)
    if (topic === undefined) {
      console.error("Can't find topic with key", topicKey)
      setState("Error")
      return
    }

    setState("Success")
    setSubTopicEntries([...topic.subTopics])
  }, [categories])

  return { subTopicEntries, state }
}
