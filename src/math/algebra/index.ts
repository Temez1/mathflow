import variablesSubTopics from "./variables"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("variables", {
  name: "Muuttujat",
  subTopics: variablesSubTopics,
})

export default topics
