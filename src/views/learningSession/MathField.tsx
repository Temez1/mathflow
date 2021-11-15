import { useLayoutEffect, useRef, useState } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import { Box } from "@chakra-ui/react"

const IS_DEV = import.meta.env.DEV
const RELATIVE_PUBLIC_DIR_PATH = IS_DEV ? "../../" : "../"

export interface MathFieldProps {
  onEnterKeyPressedOrFocusLostAndValueChanged: (answer: Latex) => void
}

// Workaround#79
// Numbers and fractions supported
const addOmittedNotEqualsToAnswer = (answer: Latex): Latex => {
  // x<any +-number> or x<+-frac>
  const regex = /(x)(?=(-?\d+|-?\\frac))/gi
  const subst = `$1\\ne`
  const result = answer.replace(regex, subst)
  return result
}

export default (props: MathFieldProps) => {
  const { onEnterKeyPressedOrFocusLostAndValueChanged } = props
  const ref = useRef<HTMLInputElement>(null)
  const mfe = new MathfieldElement({
    virtualKeyboardMode: "off",
    fontsDirectory: ".",
    soundsDirectory: RELATIVE_PUBLIC_DIR_PATH,

    // Workaround#25
    // See https://github.com/Temez1/mathflow/issues/25
    locale: "fi-FI",

    virtualKeyboardTheme: "material",
  })

  const [
    inputOffsetOnVirtualKeyboardVisible,
    setInputOffsetOnVirtualKeyboardVisible,
  ] = useState<object | undefined>()

  const handleOnEnterKeyPressedOrFocusLostAndValueChanged = () => {
    if (mfe.value !== "") {
      const withNotEquals = addOmittedNotEqualsToAnswer(mfe.value)
      onEnterKeyPressedOrFocusLostAndValueChanged(withNotEquals)
      mfe.setValue("")
    }
  }

  // Workaround#41
  // See https://github.com/Temez1/mathflow/issues/41
  const handleTouch = () => {
    let viewportHeight = document.getElementById("root")?.clientHeight

    if (viewportHeight === undefined) {
      console.error("Can't find root element")
      viewportHeight = window.innerHeight
    }

    const distanceFromBottomOfScreenInPx =
      viewportHeight - mfe.getBoundingClientRect().bottom

    const heightOfVirtualKeyboardMobileInPx = 270
    const heightOfVirtualKeyboardInPx = 330

    const marginMobile = `${
      heightOfVirtualKeyboardMobileInPx - distanceFromBottomOfScreenInPx
    }px`
    const margin = `${
      heightOfVirtualKeyboardInPx - distanceFromBottomOfScreenInPx
    }px`

    setInputOffsetOnVirtualKeyboardVisible({ base: marginMobile, md: margin })
    window.scrollTo(0, document.body.scrollHeight)
    mfe.virtualKeyboardState = "visible"
  }

  const handleInput = () => {
    // HotFix#83
    // See, https://github.com/Temez1/mathflow/issues/83
    if (mfe.value.includes("Dead")) {
      mfe.setValue(mfe.value.replace("Dead", "^"))
      mfe.position -= 1
      console.log(mfe.value)
    }
  }

  const handleBlur = () => {
    setInputOffsetOnVirtualKeyboardVisible(undefined)
  }

  useLayoutEffect(() => {
    ref.current?.appendChild(mfe)
    mfe.addEventListener(
      "change",
      handleOnEnterKeyPressedOrFocusLostAndValueChanged
    )
    mfe.addEventListener("input", handleInput)
    mfe.addEventListener("touchstart", handleTouch)
    mfe.addEventListener("blur", handleBlur)
    mfe.focus()
    return () => {
      mfe.removeEventListener(
        "change",
        handleOnEnterKeyPressedOrFocusLostAndValueChanged
      )
      mfe.removeEventListener("touchstart", handleTouch)
      mfe.removeEventListener("blur", handleBlur)
      mfe.removeEventListener("input", handleInput)
      ref.current?.removeChild(mfe)
    }
  }, [])

  return (
    <Box
      border="1px"
      rounded="md"
      boxShadow="base"
      my={{ base: "4", md: "6" }}
      mb={inputOffsetOnVirtualKeyboardVisible}
    >
      <div ref={ref} />
    </Box>
  )
}
