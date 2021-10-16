import { useLayoutEffect, useRef, useState } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import { OutputFormat } from "mathlive/dist/public/mathfield"
import { Box } from "@chakra-ui/react"

const IS_DEV = import.meta.env.DEV
const RELATIVE_PUBLIC_DIR_PATH = IS_DEV ? "../../" : "../"

export interface MathFieldProps {
  onEnterKeyPressedOrFocusLostAndValueChanged?: (newValue: string) => void
  format?: OutputFormat
}

export default ({
  onEnterKeyPressedOrFocusLostAndValueChanged = () => null,
  format = "latex",
}: MathFieldProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const mfe = new MathfieldElement({
    virtualKeyboardMode: "off",
    fontsDirectory: ".",
    soundsDirectory: RELATIVE_PUBLIC_DIR_PATH,
    locale: "fi-FI",
    virtualKeyboardTheme: "material",
  })

  const [
    inputOffsetOnVirtualKeyboardVisible,
    setInputOffsetOnVirtualKeyboardVisible,
  ] = useState<object | undefined>()

  const handleOnEnterKeyPressedOrFocusLostAndValueChanged = () => {
    if (mfe.value !== "") {
      onEnterKeyPressedOrFocusLostAndValueChanged(mfe.getValue(format))
      mfe.setValue("")
    }
  }

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

  const handleBlur = () => {
    setInputOffsetOnVirtualKeyboardVisible(undefined)
  }

  useLayoutEffect(() => {
    ref.current?.appendChild(mfe)
    mfe.addEventListener(
      "change",
      handleOnEnterKeyPressedOrFocusLostAndValueChanged
    )
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
