import { useEffect, useState } from "react"
import Categories from "../math/Categories"

export default () => {
  const [categories, setCategories] = useState<Categories | null>(null)

  const initCategories = async () => {
    const c = await Categories
    setCategories(c)
  }

  useEffect(() => {
    initCategories()
  })

  return categories
}
