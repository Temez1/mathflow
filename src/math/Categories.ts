import arithmeticTopics from "./arithmetic"

const initCategoriesSkillLevels = async () => {
  const categories: Categories = new Map()

  categories.set("arithmetic", {
    name: "Aritmetiikka",
    topics: arithmeticTopics,
  })
  // const skillLevels = await doTheFetching()

  return categories
}

export default initCategoriesSkillLevels()
