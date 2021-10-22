import { Flex, Heading, Icon, useColorModeValue } from "@chakra-ui/react"
import { MdChevronLeft } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export const AppBarHeightInPixels = 56

interface AppBarProps {
  title?: string
  navigateBackTo: string
}

export default (props: AppBarProps) => {
  const { title, navigateBackTo } = props
  const navigate = useNavigate()
  const bgColor = useColorModeValue("white", "gray.800")

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height={`${AppBarHeightInPixels}px`}
      borderBottom="1px"
      borderColor="gray.300"
      as="nav"
      align="center"
      bg={bgColor}
      zIndex="1"
    >
      <Flex
        pl="1"
        h="100%"
        align="center"
        onClick={() => navigate(navigateBackTo)}
      >
        <Icon boxSize="12" as={MdChevronLeft} />
      </Flex>
      <Heading size="xl"> {title} </Heading>
    </Flex>
  )
}
