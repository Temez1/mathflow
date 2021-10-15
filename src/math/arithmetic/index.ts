import basicOperationsSubTopics from "./basicOperations"
import exponentiationAndRootSubTopics from "./exponentiationAndRoot"
import orderOfOperationsSubTopics from "./orderOfOperations"
import fractionsSubTopics from "./fractions"

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

topics.set("fractions", {
  name: "Murtoluvut",
  subTopics: fractionsSubTopics,
})

export default topics
