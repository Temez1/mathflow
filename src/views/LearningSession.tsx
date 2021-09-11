import { Text, Flex, Spacer, Button } from "@chakra-ui/react"

export default () => (
  <Flex h="100%" direction="column">
    <Text>Description of the challenge</Text>

    <Spacer />

    <Flex direction="row-reverse">
      <Button size="lg">Vihje</Button>
    </Flex>
  </Flex>
)
