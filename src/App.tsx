import {
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
import { UserProvider } from "./ContextProviders/UserContextProvider"
import { CategoriesProvider } from "./ContextProviders/CategoriesContextProvider"
import Loading from "./sharedComponents/Loading"
import Error from "./sharedComponents/Error"

export default () => {
  const routing = useRoutes(routes)
  const { status, data: signinResult } = useSigninCheck()
  const auth = useAuth()
  const toast = useToast()

  if (status === "loading") {
    return <Loading text="1+1=..." />
  }

  if (status === "error") {
    return (
      <Error text="Profiilin hakeminen epäonnistui. Yritä päivittää sivu." />
    )
  }

  const { signedIn, user } = signinResult

  if (signedIn && user) {
    return (
      <UserProvider user={user}>
        <CategoriesProvider>{routing}</CategoriesProvider>
      </UserProvider>
    )
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
