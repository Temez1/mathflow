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
import MathDisplay from "../../sharedComponents/MathDisplay"
import MathField from "../../sharedComponents/MathField"
import recommendationAlgorithm, {
  ALL_DONE,
} from "../../math/recommendationAlgorithm"
import SessionAnswers from "./SessionAnswers"

export default () => {
  const [isAlert, setIsAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const successBgColor = useColorModeValue("lightgreen", "darkgreen")
  const [subTopic, setSubTopic] = useState<SubTopic | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  const subTopicRef = useRef<SubTopic | null>(subTopic)
  subTopicRef.current = subTopic
  const challengeRef = useRef<Challenge | null>(challenge)
  challengeRef.current = challenge
  const sessionAnswers = useRef(new SessionAnswers()).current

  const setNextSubTopicAndChallenge = async () => {
    subTopicRef.current = await recommendationAlgorithm()

    if (subTopicRef.current === ALL_DONE) {
      const navigate = useNavigate()
      alert("Wau! Oot Pro kaikessa, onnittelut!")
      navigate("/progress")
      setSubTopic(null)
      setChallenge(null)
      return
    }

    setSubTopic(subTopicRef.current)
    setChallenge(subTopicRef.current.getChallenge())
  }

  useEffect(() => {
    setNextSubTopicAndChallenge()
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
    sessionAnswers.helpUsed = true
    setSteps(steps.concat(challenge.steps[steps.length]))
  }

  const updateLearningSessionRightAnswer = () => {
    if (subTopicRef.current === null) {
      return
    }

    const currentSkillLevel = subTopicRef.current.getCurrentSkillLevel()

    if (currentSkillLevel === "unknown") {
      subTopicRef.current.updateSkillLevel("beginner")
      console.log("Hi, I'm now a beginner!")
      setChallenge(subTopicRef.current.getChallenge())
    } else if (currentSkillLevel === "beginner") {
      subTopicRef.current.updateSkillLevel("skilled")
      console.log("Hi, I'm now skilled!")
      setNextSubTopicAndChallenge()
    } else if (currentSkillLevel === "skilled") {
      console.log("Hi, I'm still skilled!")
      setChallenge(subTopicRef.current.getChallenge())
    }

    sessionAnswers.addRightAnswer()
    showSuccess()
    setSteps([])
  }

  const checkAnswer = (studentAnswer: string) => {
    if (challengeRef.current === null) {
      return
    }

    for (const answer of challengeRef.current.answers) {
      if (studentAnswer === answer) {
        updateLearningSessionRightAnswer()
        console.log(sessionAnswers)
        return
      }
    }
    console.log(sessionAnswers)
    sessionAnswers.addWrongAnswer()
    showAlert()
  }

  if (subTopic === null || challenge === null) {
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
