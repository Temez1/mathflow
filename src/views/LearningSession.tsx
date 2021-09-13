import { Text, Flex, Spacer, Button } from "@chakra-ui/react"
import "mathlive/dist/mathlive-fonts.css"
import "mathlive/dist/sounds/plonk.wav"
import "mathlive/dist/sounds/keypress-standard.wav"
import "mathlive/dist/sounds/keypress-delete.wav"
import "mathlive/dist/sounds/keypress-return.wav"
import "mathlive/dist/sounds/keypress-spacebar.wav"
import { MathfieldElement } from "mathlive"

export default () => {
  const mfe = new MathfieldElement()

  mfe.setOptions({ virtualKeyboardMode: "manual" })

  return (
    <Flex h="100%" direction="column">
      <Text>Description of the challenge</Text>

      <Spacer />

      <math-field />

      <Flex direction="row-reverse">
        <Button size="lg">Vihje</Button>
      </Flex>
    </Flex>
  )
}
