import basicOperationsSubTopics from "./basicOperations"
import exponentiationAndRootSubTopics from "./exponentiationAndRoot"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("basicOperations", {
  name: "Perusoperaatiot",
  subTopics: basicOperationsSubTopics,
})

topics.set("exponentAndRoot", {
  name: "Potenssi ja neliöjuuri",
  subTopics: exponentiationAndRootSubTopics,
})

export default topics
