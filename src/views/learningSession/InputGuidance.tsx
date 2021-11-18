import {
  Button,
  Heading,
  Text,
  Kbd,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import { SubTopicWithPath } from "../../math/recommendationAlgorithm"

export interface InputGuidanceProps {
  subTopic: SubTopicWithPath
}

export default (props: InputGuidanceProps) => {
  const { subTopic } = props

  return (
    <>
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
                  (explanation, i) => (
                    // We are just listing the values
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i}>
                      <Text display="inline">{`${explanation.text} `}</Text>
                      {explanation.keyboardKeys?.map(
                        ({ keyboardKey, combiner }, j) => (
                          // We are just listing the values
                          // eslint-disable-next-line react/no-array-index-key
                          <span key={j}>
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
                      (explanation, i) => (
                        // We are just listing the values
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={i}>
                          <Text display="inline">{`${explanation.text} `}</Text>
                          {explanation.keyboardKeys?.map(
                            ({ keyboardKey, combiner }, j) => (
                              // We are just listing the values
                              // eslint-disable-next-line react/no-array-index-key
                              <span key={j}>
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
    </>
  )
}
