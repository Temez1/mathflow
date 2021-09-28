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

const UNDEFINED_ANSWERS = ["undefined", "määrittelemätön"]

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

  const navigate = useNavigate()

  const setNextSubTopicAndChallenge = async (init = false) => {
    subTopicRef.current = await recommendationAlgorithm()

    if (subTopicRef.current === ALL_DONE) {
      alert("Wau! Oot Pro kaikessa, onnittelut!")
      navigate("/progress")
      return
    }

    if (!init) {
      sessionAnswers.saveSubTopicAnswers()
      sessionAnswers.resetLastFiveAnswers()
    }

    setSubTopic(subTopicRef.current)
    setChallenge(
      subTopicRef.current.getChallenge(
        subTopicRef.current.skillLevel.getSkillLevel()
      )
    )
  }

  useEffect(() => {
    setNextSubTopicAndChallenge(true)
    return () => {
      setSubTopic(null)
      setChallenge(null)
    }
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

    sessionAnswers.addRightAnswer()
    const currentSkillLevel = subTopicRef.current.skillLevel.getSkillLevel()

    if (currentSkillLevel === "unknown") {
      subTopicRef.current.skillLevel.updateSkillLevel("beginner")
      console.log("Hi, I'm now a beginner!")
      setChallenge(
        subTopicRef.current.getChallenge(
          subTopicRef.current.skillLevel.getSkillLevel()
        )
      )
    } else if (
      currentSkillLevel === "beginner" &&
      sessionAnswers.lastFiveAnswers.answers === 5 &&
      sessionAnswers.lastFiveAnswers.correctAnswers >= 4 &&
      sessionAnswers.lastFiveAnswers.answersWithHelp <= 2
    ) {
      subTopicRef.current.skillLevel.updateSkillLevel("skilled")
      console.log("Hi, I'm now skilled!")
      setNextSubTopicAndChallenge()
    } else if (
      currentSkillLevel === "skilled" &&
      sessionAnswers.lastFiveAnswers.streak === 5 &&
      sessionAnswers.lastFiveAnswers.answersWithHelp === 0
    ) {
      subTopicRef.current.skillLevel.updateSkillLevel("pro")
      console.log("Hi, I'm now pro!")
      setNextSubTopicAndChallenge()
    } else {
      setChallenge(
        subTopicRef.current.getChallenge(
          subTopicRef.current.skillLevel.getSkillLevel()
        )
      )
    }

    showSuccess()
    setSteps([])
  }

  const checkAnswer = (studentAnswer: string) => {
    if (challengeRef.current === null) {
      return
    }

    if (challengeRef.current.answers === undefined) {
      for (const undefinedAnswer of UNDEFINED_ANSWERS) {
        if (studentAnswer.toLowerCase() === undefinedAnswer) {
          updateLearningSessionRightAnswer()
          console.log(sessionAnswers)
          return
        }
      }
    } else {
      for (const answer of challengeRef.current.answers) {
        if (studentAnswer === answer) {
          updateLearningSessionRightAnswer()
          console.log(sessionAnswers)
          return
        }
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
          <ModalBody p="0" bg={successBgColor}>
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

      {steps.map((step) => {
        if (step.explanation) {
          return (
            <div key={step.explanation}>
              <MathDisplay value={step.math} />
              <Text> {step.explanation} </Text>
            </div>
          )
        }
        return <MathDisplay key={step.math} value={step.math} />
      })}

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
