import {
  Text,
  Flex,
  Spacer,
  Button,
  Box,
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalContent,
  ModalBody,
  Center,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MathDisplay from "../components/MathDisplay"
import MathField from "../components/MathField"
import recommendationAlgorithm, {
  ALL_DONE,
} from "../math/recommendationAlgorithm"

const createNewChallenge = (): Challenge => {
  const newChallenge = recommendationAlgorithm()
  if (newChallenge === ALL_DONE) {
    const navigate = useNavigate()
    alert("Wau! Oot Pro kaikessa, onnittelut!")
    navigate("/progress")
  }

  return newChallenge as Challenge
}

export default () => {
  const [isAlert, setIsAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const successBgColor = useColorModeValue("lightgreen", "darkgreen")
  const [challenge, setChallenge] = useState<Challenge>(createNewChallenge())

  console.log("current challenge", challenge.descriptionLatex)

  useEffect(() => {
    console.log("current challenge", challenge.descriptionLatex)
  }, [challenge])

  const showAlert = () => {
    setIsAlert(true)
    setTimeout(() => {
      setIsAlert(false)
    }, 3000)
  }

  const showSuccess = () => {
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
    }, 2000)
  }

  const showStep = () => {
    if (steps.length === challenge.steps.length) {
      return
    }
    setSteps(steps.concat(challenge.steps[steps.length]))
  }

  const checkAnswer = (studentAnswer: string) => {
    console.log("Checking answer, challenge", challenge.descriptionLatex)
    for (const answer of challenge.answers) {
      if (studentAnswer === answer) {
        showSuccess()
        setChallenge(createNewChallenge())
        return
      }
    }
    console.log(studentAnswer, "!=", challenge.answers[0])
    showAlert()
  }

  return (
    <Flex h="100%" direction="column">
      <Modal isOpen={isSuccess} size="full" onClose={() => {}}>
        <ModalContent>
          <ModalBody bg={successBgColor}>
            <Center h="100vh">
              <Heading>Hienosti tehty!</Heading>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Text>Description of the challenge</Text>

      {challenge.descriptionLatex && (
        <MathDisplay value={challenge.descriptionLatex} />
      )}

      {steps.map((step) => (
        <MathDisplay key={step.math} value={step.math} />
      ))}

      <Spacer />

      {isAlert && (
        <Alert status="warning">
          <AlertIcon />
          <AlertDescription>
            Vastauksessa on vähän vielä korjattavaa
          </AlertDescription>
        </Alert>
      )}
      <Box border="1px" rounded="md" boxShadow="base" my="8">
        <MathField onEnterKeyPressedOrFocusLostAndValueChanged={checkAnswer} />
      </Box>

      <Flex direction="row-reverse">
        <Button size="lg" onClick={showStep}>
          Vihje
        </Button>
      </Flex>
    </Flex>
  )
}
