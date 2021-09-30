import { Flex, Center, Icon, Text } from "@chakra-ui/react"
import { MdHome, MdShowChart, MdPerson } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"

export const bottomNavBarHeightInPixels = 56

export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      width="100vw"
      height={`${bottomNavBarHeightInPixels}px`}
      borderTop="1px"
      borderColor="gray.300"
      as="nav"
    >
      <Flex
        as="button"
        onClick={() => {
          navigate("/")
        }}
        flexGrow={1}
        opacity={location.pathname === "/" ? "100%" : "76%"}
      >
        <Center w="100%" h="100%">
          <Flex flexDir="column" alignItems="center">
            <Icon boxSize="6" as={MdHome} />
            <Text>Opi</Text>
          </Flex>
        </Center>
      </Flex>
      <Flex
        as="button"
        onClick={() => {
          navigate("/progress")
        }}
        flexGrow={1}
        opacity={location.pathname === "/progress" ? "100%" : "76%"}
      >
        <Center w="100%" h="100%">
          <Flex flexDir="column" alignItems="center">
            <Icon boxSize="6" as={MdShowChart} />
            <Text>Edistyminen</Text>
          </Flex>
        </Center>
      </Flex>
      <Flex
        as="button"
        onClick={() => {
          navigate("/profile")
        }}
        flexGrow={1}
        opacity={location.pathname === "/profile" ? "100%" : "76%"}
      >
        <Center w="100%" h="100%">
          <Flex flexDir="column" alignItems="center">
            <Icon boxSize="6" as={MdPerson} />
            <Text>Profiili</Text>
          </Flex>
        </Center>
      </Flex>
    </Flex>
  )
}
