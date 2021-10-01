import {
  Spinner,
  Center,
  Heading,
  VStack,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react"
import { useRoutes } from "react-router-dom"
import { useAuth, useSigninCheck } from "reactfire"
import { FcGoogle } from "react-icons/fc"
import {
  AuthError,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth"
import routes from "./routes"
import Card from "./sharedComponents/Card"
import responsiveConstants from "./layouts/responsiveConstants"

export default () => {
  const routing = useRoutes(routes)
  const { status, data: signinResult } = useSigninCheck()
  const auth = useAuth()
  const toast = useToast()

  if (status === "loading") {
    return (
      <Center h="100vh">
        <VStack>
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Heading>Ladataan...</Heading>
        </VStack>
      </Center>
    )
  }

  const { signedIn } = signinResult

  if (signedIn) {
    return <> {routing} </>
  }

  const signIn = async () => {
    const provider = new GoogleAuthProvider()

    await signInWithRedirect(auth, provider).catch((error: AuthError) => {
      toast({
        title: "Kirjautuminen epäonnistui",
        description: error.message,
        status: "error",
        isClosable: true,
      })
    })
  }

  return (
    <Center h="100vh">
      <VStack>
        <Card>
          <Heading>Aloita Oppiminen</Heading>
          <VStack pt={responsiveConstants.spacing}>
            <Button
              onClick={signIn}
              leftIcon={<Icon boxSize="6" as={FcGoogle} />}
            >
              Jatka Googlella
            </Button>
          </VStack>
        </Card>
      </VStack>
    </Center>
  )
}
