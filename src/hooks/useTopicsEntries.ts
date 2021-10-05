import { TaskState } from "firebase/firestore"
import { useState, useLayoutEffect } from "react"
import { useCategories } from "../ContextProviders/CategoriesContextProvider"

export default (categoryKey: string) => {
  const { categories, state: categoriesState } = useCategories()
  const [state, setState] = useState<TaskState>("Running")
  const [topicEntries, setTopicEntries] = useState<[string, Topic][] | null>(
    null
  )

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
    setState("Success")
    setTopicEntries([...category.topics])
  }, [categories])

  return { topicEntries, state }
}
