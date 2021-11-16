import { Heading, Text, Button, Flex, Icon } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MdChevronRight } from "react-icons/md"
import Card from "../../sharedComponents/Card"
import HeaderLayout from "../../layouts/app/HeaderLayout"
import CardsLayout from "../../layouts/CardsLayout"
import { useCategories } from "../../ContextProviders/CategoriesContextProvider"
import Loading from "../../sharedComponents/Loading"
import Error from "../../sharedComponents/Error"
import { useCurrentUser } from "../../ContextProviders/UserContextProvider"

export default () => {
  const navigate = useNavigate()
  const { categories, state } = useCategories()
  const user = useCurrentUser()

  if (state === "Running") {
    return <Loading text="Teroitetaan kyniä" />
  }

  if (state === "Error" || categories === null) {
    return <Error text="Kynät oli loppu tällä kertaa. Yritä päivittää sivu." />
  }

  return (
    <>
      <HeaderLayout>
        <Heading size="lg">Tervetuloa {user.displayName}!</Heading>
      </HeaderLayout>
      <CardsLayout>
        <Card>
          <Text>Opiskele ja edisty sitä mukaan kun kehityt!</Text>
          <Flex direction="row-reverse">
            <Button my="4" size="lg" onClick={() => navigate("/learning")}>
              Opiskele
            </Button>
          </Flex>
        </Card>
        {[...categories].map(([categoryKey, category]) => (
          <Card
            key={category.name}
            onClickHandler={() => navigate(`/${categoryKey}`)}
          >
            <Flex justify="space-between" align="center">
              <Heading display="inline" size="lg">
                {category.name}
              </Heading>
              <Icon boxSize="10" as={MdChevronRight} />
            </Flex>
          </Card>
        ))}
      </CardsLayout>
    </>
  )
}
