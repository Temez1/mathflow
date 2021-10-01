import {
  Button,
  Heading,
  Switch,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react"
import { useAuth } from "reactfire"
import { AuthError } from "firebase/auth"
import Card from "../../sharedComponents/Card"
import HeaderLayout from "../../layouts/app/HeaderLayout"
import CardsLayout from "../../layouts/CardsLayout"

export default () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const auth = useAuth()
  const toast = useToast()

  const signOut = async () => {
    await auth.signOut().catch((error: AuthError) => {
      toast({
        title: "Uloskirjautuminen epäonnistui",
        description: error.message,
        status: "error",
        isClosable: true,
      })
    })
  }

  return (
    <>
      <HeaderLayout>
        <Heading size="xl">Profiili</Heading>
      </HeaderLayout>
      <CardsLayout>
        <Card>
          <Text display="inline-block">Pimeä tila</Text>
          <Switch
            pl="4"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
        </Card>
        <Button onClick={signOut}>Kirjaudu ulos</Button>
      </CardsLayout>
    </>
  )
}
