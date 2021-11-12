import variablesSubTopics from "./variables"
import equationsSubTopics from "./equations"
import logarithmsSubTopics from "./logarithms"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("variables", {
  name: "Muuttujat",
  subTopics: variablesSubTopics,
})

topics.set("equations", {
  name: "Yhtälöt",
  subTopics: equationsSubTopics,
})

topics.set("logarithm", {
  name: "Logaritmi",
  subTopics: logarithmsSubTopics,
})

export default topics
