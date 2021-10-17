import {
  Text,
  Flex,
  Spacer,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalContent,
  ModalBody,
  Center,
  Heading,
  useColorModeValue,
  useToast,
  Kbd,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  PopoverHeader,
  Link,
} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAnalytics, useFirestore } from "reactfire"
import { logEvent } from "firebase/analytics"
import { FaDiscord } from "react-icons/fa"
import MathDisplay from "../../sharedComponents/MathDisplay"
import MathField from "../../sharedComponents/MathField"
import recommendationAlgorithm, {
  SubTopicWithPath,
  ALL_DONE,
} from "../../math/recommendationAlgorithm"
import SessionAnswers from "./SessionAnswers"
import { SubTopicViewNavigateState } from "../subTopics/SubTopics"
import { useCategories } from "../../ContextProviders/CategoriesContextProvider"
import Loading from "../../sharedComponents/Loading"
import Error from "../../sharedComponents/Error"
import { useCurrentUser } from "../../ContextProviders/UserContextProvider"

export const UNDEFINED_ANSWERS = ["undefined", "määrittelemätön"]

export default () => {
  const [isAlert, setIsAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const successBgColor = useColorModeValue("lightgreen", "darkgreen")
  const [subTopic, setSubTopic] = useState<SubTopicWithPath | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const { categories, state: categoriesState } = useCategories()

  const subTopicRef = useRef<SubTopicWithPath | null>(subTopic)
  subTopicRef.current = subTopic
  const challengeRef = useRef<Challenge | null>(challenge)
  challengeRef.current = challenge
  const sessionAnswers = useRef(new SessionAnswers()).current
  const categoriesRef = useRef(categories)

  const navigate = useNavigate()
  const { state } = useLocation()
  const { mode, categoryKey, topicKey, subTopicKey } =
    (state as SubTopicViewNavigateState) || {}

  const analytics = useAnalytics()
  const firestore = useFirestore()
  const user = useCurrentUser()

  const toast = useToast()

  const setNextSubTopicAndChallenge = async () => {
    if (mode === "linear") {
      const sameSubTopic = categories
        ?.get(categoryKey)
        ?.topics.get(topicKey)
        ?.subTopics.get(subTopicKey)

      if (sameSubTopic === undefined) {
        console.error("Can't find subTopic")
        return
      }
      subTopicRef.current = {
        subTopic: sameSubTopic,
        categoryKey,
        topicKey,
        subTopicKey,
      }
    } else if (categoriesRef.current !== null) {
      subTopicRef.current = await recommendationAlgorithm(categoriesRef.current)
    }

    if (subTopicRef.current === ALL_DONE) {
      alert("Wau! Oot Pro kaikessa, onnittelut!")
      logEvent(analytics, "all_done")
      navigate("/progress")
      return
    }

    setSubTopic(subTopicRef.current)
    setChallenge(
      subTopicRef.current.subTopic.getChallenge(
        subTopicRef.current.subTopic.skillLevel.getSkillLevel()
      )
    )
  }

  useEffect(() => {
    if (categories !== null) {
      categoriesRef.current = categories
      setNextSubTopicAndChallenge()
    }
    return () => {
      setSubTopic(null)
      setChallenge(null)
    }
  }, [categories])

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
    }, 1500)
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
    const currentSkillLevel =
      subTopicRef.current.subTopic.skillLevel.getSkillLevel()

    if (currentSkillLevel === "unknown") {
      subTopicRef.current.subTopic.skillLevel
        .updateSkillLevel(
          "beginner",
          firestore,
          user,
          subTopicRef.current.categoryKey,
          subTopicRef.current.topicKey,
          subTopicRef.current.subTopicKey
        )
        .catch((error) => {
          toast({
            title:
              "Taitotason tallentaminen epäonnistui. Varmista vakaa nettiyhteys.",
            description: error.message,
            status: "error",
            isClosable: true,
          })
        })
    } else if (
      currentSkillLevel === "beginner" &&
      sessionAnswers.lastFiveAnswers.answers === 5 &&
      sessionAnswers.lastFiveAnswers.correctAnswers >= 4 &&
      sessionAnswers.lastFiveAnswers.answersWithHelp <= 2
    ) {
      subTopicRef.current.subTopic.skillLevel
        .updateSkillLevel(
          "skilled",
          firestore,
          user,
          subTopicRef.current.categoryKey,
          subTopicRef.current.topicKey,
          subTopicRef.current.subTopicKey
        )
        .catch((error) => {
          toast({
            title:
              "Taitotason tallentaminen epäonnistui. Varmista vakaa nettiyhteys.",
            description: error.message,
            status: "error",
            isClosable: true,
          })
        })
    } else if (
      currentSkillLevel === "skilled" &&
      sessionAnswers.lastFiveAnswers.streak === 5 &&
      sessionAnswers.lastFiveAnswers.answersWithHelp === 0
    ) {
      subTopicRef.current.subTopic.skillLevel
        .updateSkillLevel(
          "pro",
          firestore,
          user,
          subTopicRef.current.categoryKey,
          subTopicRef.current.topicKey,
          subTopicRef.current.subTopicKey
        )
        .catch((error) => {
          toast({
            title:
              "Taitotason tallentaminen epäonnistui. Varmista vakaa nettiyhteys.",
            description: error.message,
            status: "error",
            isClosable: true,
          })
        })
    }

    const newSkillLevel =
      subTopicRef.current.subTopic.skillLevel.getSkillLevel()
    const skillLevelChanged = newSkillLevel !== currentSkillLevel

    if (skillLevelChanged) {
      logEvent(analytics, "learned_new_skill", {
        skillLevel: newSkillLevel,
        category: subTopicRef.current.categoryKey,
        topic: subTopicRef.current.topicKey,
        subTopic: subTopicRef.current.subTopicKey,
      })
      sessionAnswers.saveSubTopicAnswers()
      sessionAnswers.resetLastFiveAnswers()
      setNextSubTopicAndChallenge()
    } else {
      setChallenge(
        subTopicRef.current.subTopic.getChallenge(
          subTopicRef.current.subTopic.skillLevel.getSkillLevel()
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
        console.log("student answer", studentAnswer, " answer", answer)
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

  if (categoriesState === "Running") {
    return <Loading text="Lasketaan laskuja" />
  }

  if (
    categoriesState === "Error" ||
    categories === null ||
    subTopic === null ||
    challenge === null
  ) {
    return <Error text="Laskut meni pieleen. Yritä päivittää sivu." />
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

      <Text pb="2">{challenge.description}</Text>

      {challenge.descriptionLatex && (
        <MathDisplay value={challenge.descriptionLatex} />
      )}

      {steps.map((step) => {
        if (step.explanation) {
          return (
            <Box key={step.explanation} pt="2">
              <MathDisplay value={step.math} />
              <Text pt="2"> {step.explanation} </Text>
            </Box>
          )
        }
        return (
          <Box key={step.math} pt="2">
            <MathDisplay value={step.math} />
          </Box>
        )
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

      <Flex direction="row-reverse" align="baseline">
        <Button
          size="xs"
          onClick={() => {
            checkAnswer("määrittelemätön")
          }}
        >
          Määrittelemätön
        </Button>

        <Spacer />

        {subTopic.subTopic.inputGuidance && (
          <Popover returnFocusOnClose={false} placement="top-end">
            <PopoverTrigger>
              <Button variant="link">Kuinka vastaan?</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Heading size="sm"> Tietokoneella </Heading>
                <div>
                  {subTopic.subTopic.inputGuidance.desktop.map(
                    (explanation) => (
                      <span key={explanation.text}>
                        <Text display="inline">{`${explanation.text} `}</Text>
                        {explanation.keyboardKeys?.map(
                          ({ keyboardKey, combiner }) => (
                            <span key={keyboardKey}>
                              <Kbd>{keyboardKey}</Kbd>
                              <> {combiner} </>
                            </span>
                          )
                        )}
                      </span>
                    )
                  )}
                </div>
                {subTopic.subTopic.inputGuidance.mobile && (
                  <>
                    <Heading size="sm" pt="2">
                      Kännykällä tai tabletilla
                    </Heading>
                    <div>
                      {subTopic.subTopic.inputGuidance.mobile.map(
                        (explanation) => (
                          <span key={explanation.text}>
                            <Text display="inline">{`${explanation.text} `}</Text>
                            {explanation.keyboardKeys?.map(
                              ({ keyboardKey, combiner }) => (
                                <span key={keyboardKey}>
                                  <Kbd>{keyboardKey}</Kbd>
                                  <> {combiner} </>
                                </span>
                              )
                            )}
                          </span>
                        )
                      )}
                    </div>
                  </>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>

      <MathField onEnterKeyPressedOrFocusLostAndValueChanged={checkAnswer} />

      <Flex direction="row-reverse" align="flex-end">
        <Button size="lg" onClick={showStep}>
          Vihje
        </Button>
        <Popover returnFocusOnClose={false}>
          <PopoverTrigger>
            <Button size="xs" pr="2" variant="link">
              Jäikö kysyttävää?
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Tervetuloa yhteisöön!</PopoverHeader>
            <PopoverBody>
              <Text>
                MathFlow:n yhteisö löytyy Discordista. Siellä voit kysyä apua
                matematiikan opiskeluun, jakaa opiskeluvinkkejä tai antaa
                palautetta sovelluksesta.
              </Text>
              <Link href="https://discord.gg/SgapBEqDXm" isExternal>
                <Button rightIcon={<FaDiscord />} mt="2">
                  Liity mukaan!
                </Button>
              </Link>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}
