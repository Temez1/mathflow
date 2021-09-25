import basicOperationsSubTopics from "./basicOperations"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("basicOperations", {
  name: "Perus operaatiot",
  subTopics: basicOperationsSubTopics,
})

export default topics
