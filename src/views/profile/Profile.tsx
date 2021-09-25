import { Heading, Switch, Text, useColorMode } from "@chakra-ui/react"
import Card from "../../sharedComponents/Card"
import AppBarLayout from "../../layouts/app/AppBarLayout"
import CardsLayout from "../../layouts/CardsLayout"

export default () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <AppBarLayout>
        <Heading size="xl">Profiili</Heading>
      </AppBarLayout>
      <CardsLayout>
        <Card>
          <Text display="inline-block">Pimeä tila</Text>
          <Switch
            pl="4"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
        </Card>
      </CardsLayout>
    </>
  )
}
