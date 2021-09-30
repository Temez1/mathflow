import { Heading, Switch, Text, useColorMode } from "@chakra-ui/react"
import Card from "../../sharedComponents/Card"
import HeaderLayout from "../../layouts/app/HeaderLayout"
import CardsLayout from "../../layouts/CardsLayout"

export default () => {
  const { colorMode, toggleColorMode } = useColorMode()

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
      </CardsLayout>
    </>
  )
}
