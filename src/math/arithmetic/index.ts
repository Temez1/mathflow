import basicOperationsSubTopics from "./basicOperations"
import exponentiationAndRootSubTopics from "./exponentiationAndRoot"
import orderOfOperationsSubTopics from "./orderOfOperations"

const topics = new Map<NameLowerCamelCase, Topic>()

topics.set("basicOperations", {
  name: "Perusoperaatiot",
  subTopics: basicOperationsSubTopics,
})

topics.set("exponentAndRoot", {
  name: "Potenssi ja neliöjuuri",
  subTopics: exponentiationAndRootSubTopics,
})

topics.set("orderOfOperations", {
  name: "Laskujärjestys",
  subTopics: orderOfOperationsSubTopics,
})

export default topics
