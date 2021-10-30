import variablesSubTopics from "./variables"
import equationsSubTopics from "./equations"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("variables", {
  name: "Muuttujat",
  subTopics: variablesSubTopics,
})

topics.set("equations", {
  name: "Yhtälöt",
  subTopics: equationsSubTopics,
})

export default topics
