import { Text, Flex, Spacer, Button, Box } from "@chakra-ui/react"
import { useState } from "react"
import MathField from "../components/MathField"

export default () => {
  const [inputValue, setInputValue] = useState("")

  const onMathFieldChange = (newValue: string) => {
    setInputValue(newValue)
  }

  return (
    <Flex h="100%" direction="column">
      <Text>Description of the challenge</Text>

      <Spacer />

      <Box border="1px" rounded="md" boxShadow="base" my="8">
        <MathField onChange={onMathFieldChange} />
        {inputValue}
      </Box>

      <Flex direction="row-reverse">
        <Button size="lg">Vihje</Button>
      </Flex>
    </Flex>
  )
}
