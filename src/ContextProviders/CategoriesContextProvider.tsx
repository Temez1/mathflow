import {
  query,
  collection,
  TaskState,
  getDocsFromServer,
} from "firebase/firestore"
import { createContext, useEffect, useState, useContext } from "react"
import { useFirestore } from "reactfire"
import arithmetic from "../math/arithmetic"
import algebra from "../math/algebra"
import { useCurrentUser } from "./UserContextProvider"

export interface ICategoriesContext {
  categories: Categories | null
  state: TaskState
}

export const CategoriesContext = createContext<ICategoriesContext>({
  categories: null,
  state: "Running",
})

interface CategoriesContextProviderProps {
  children: React.ReactNode
}

export const CategoriesProvider = ({
  children,
}: CategoriesContextProviderProps) => {
  const [categories, setCategories] = useState<Categories | null>(null)
  const [state, setState] = useState<TaskState>("Running")
  const firestore = useFirestore()
  const user = useCurrentUser()

  const initCategories = async () => {
    const c: Categories = new Map()

    c.set("arithmetic", {
      name: "Aritmetiikka",
      topics: arithmetic,
    })

    c.set("algebra", {
      name: "Algebra",
      topics: algebra,
    })

    const userSkillLevelsSnapshot = await getDocsFromServer(
      query(collection(firestore, "users", user.uid, "skillLevels"))
    ).catch(() => null)

    if (userSkillLevelsSnapshot === null) {
      setState("Error")
      return
    }

    userSkillLevelsSnapshot.forEach((doc) => {
      const { skillLevel, categoryKey, topicKey, subTopicKey } = doc.data()

      c.get(categoryKey)
        ?.topics.get(topicKey)
        ?.subTopics.get(subTopicKey)
        ?.skillLevel.initSkillLevel(doc.id, skillLevel)
    })

    setCategories(c)
    setState("Success")
  }

  useEffect(() => {
    initCategories()
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories, state }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext)
