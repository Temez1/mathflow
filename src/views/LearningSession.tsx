import { Text, Flex, Spacer, Button, Box } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MathField from "../components/MathField"
import recommendationAlgorithm, {
  ALL_DONE,
} from "../math/recommendationAlgorithm"

export default () => {
  const [inputValue, setInputValue] = useState("")
  const [steps, setSteps] = useState<Step[]>([])
  const challenge = recommendationAlgorithm()
  const navigate = useNavigate()

  if (challenge === ALL_DONE) {
    alert("Wau! Oot Pro kaikessa, onnittelut!")
    navigate("/progress")
    return <></>
  }

  const onMathFieldChange = (newValue: string) => {
    setInputValue(newValue)
  }

  const showStep = () => {
    if (steps.length === challenge.steps.length) {
      return
    }
    setSteps(steps.concat(challenge.steps[steps.length]))
  }

  return (
    <Flex h="100%" direction="column">
      <Text>Description of the challenge</Text>
      {challenge.descriptionLatex && (
        <MathField initialValue={challenge.descriptionLatex} readOnly />
      )}

      {steps.map((step) => (
        <MathField key={step.latex} initialValue={step.latex} readOnly />
      ))}

      <Spacer />

      <Box border="1px" rounded="md" boxShadow="base" my="8">
        <MathField onChange={onMathFieldChange} />
        {inputValue}
      </Box>

      <Flex direction="row-reverse">
        <Button size="lg" onClick={showStep}>
          Vihje
        </Button>
      </Flex>
    </Flex>
  )
}
