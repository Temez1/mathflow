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
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import MathDisplay from "../components/MathDisplay"
import MathField from "../components/MathField"
import recommendationAlgorithm, {
  ALL_DONE,
} from "../math/recommendationAlgorithm"

const createNewChallenge = (): Challenge | null => {
  const newChallenge = recommendationAlgorithm()
  if (newChallenge === ALL_DONE) {
    const navigate = useNavigate()
    alert("Wau! Oot Pro kaikessa, onnittelut!")
    navigate("/progress")
    return null
  }

  return newChallenge as Challenge
}

export default () => {
  const [isAlert, setIsAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const successBgColor = useColorModeValue("lightgreen", "darkgreen")
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const challengeRef = useRef<Challenge | null>(null)
  challengeRef.current = challenge

  useEffect(() => {
    const newChallenge = createNewChallenge()
    setChallenge(newChallenge)
  }, [])

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
    }, 2500)
  }

  const showStep = () => {
    if (challenge === null) {
      return
    }

    if (steps.length === challenge.steps.length) {
      return
    }
    setSteps(steps.concat(challenge.steps[steps.length]))
  }

  // We are using ref because this function is passed as an event handler for MathField.
  // Using the state would lead to stale state because the event listeners aren't
  // updated when the state of the challenge changes.
  const checkAnswer = (studentAnswer: string) => {
    if (challengeRef.current === null) {
      return
    }

    for (const answer of challengeRef.current.answers) {
      if (studentAnswer === answer) {
        showSuccess()
        const newChallenge = createNewChallenge()
        setChallenge(newChallenge)
        setSteps([])
        return
      }
    }
    showAlert()
  }

  if (challenge === null) {
    return <></>
  }

  return (
    <Flex h="100%" direction="column">
      <Modal
        trapFocus={false}
        isOpen={isSuccess}
        size="full"
        onClose={() => {}}
      >
        <ModalContent>
          <ModalBody bg={successBgColor}>
            <Center h="100vh">
              <Heading>Hienosti tehty!</Heading>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Text>{challenge.description}</Text>

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
