import { Heading, Text, Button } from "@chakra-ui/react"
import Card from "../components/Card"
import AppBarLayout from "../layouts/AppBarLayout"
import CardsLayout from "../layouts/CardsLayout"

export default () => (
  <>
    <AppBarLayout>
      <Heading size="xl">Tervetuloa takaisin!</Heading>
    </AppBarLayout>
    <CardsLayout>
      <Card>
        <Text>Jatka oppimista siitä mihin jäit</Text>
        <Button my="4" size="lg">
          Jatka oppimista
        </Button>
      </Card>
    </CardsLayout>
  </>
)
