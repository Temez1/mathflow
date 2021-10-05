import { Center, Heading, VStack } from "@chakra-ui/react"

export interface ErrorProps {
  text: string
}

export default (props: ErrorProps) => {
  const { text } = props

  return (
    <Center h="100vh">
      <VStack>
        <Heading>{text}</Heading>
      </VStack>
    </Center>
  )
}
