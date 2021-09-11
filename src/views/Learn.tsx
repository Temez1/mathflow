import { Heading, Text, Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import AppBarLayout from "../layouts/app/AppBarLayout"
import CardsLayout from "../layouts/CardsLayout"

export default () => {
  const navigate = useNavigate()

  return (
    <>
      <AppBarLayout>
        <Heading size="xl">Tervetuloa takaisin!</Heading>
      </AppBarLayout>
      <CardsLayout>
        <Card>
          <Text>Jatka oppimista siitä mihin jäit</Text>
          <Flex direction="row-reverse">
            <Button my="4" size="lg" onClick={() => navigate("/learning")}>
              Jatka oppimista
            </Button>
          </Flex>
        </Card>
      </CardsLayout>
    </>
  )
}
