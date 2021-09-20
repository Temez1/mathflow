import { useLayoutEffect, useRef } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import { OutputFormat } from "mathlive/dist/public/mathfield"

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
    virtualKeyboardMode: "manual",
    fontsDirectory: ".",
    soundsDirectory: RELATIVE_PUBLIC_DIR_PATH,
  })

  const handleOnEnterKeyPressedOrFocusLostAndValueChanged = () => {
    if (mfe.value !== "") {
      onEnterKeyPressedOrFocusLostAndValueChanged(mfe.getValue(format))
      mfe.setValue("")
    }
  }

  useLayoutEffect(() => {
    ref.current?.appendChild(mfe)
    mfe.addEventListener(
      "change",
      handleOnEnterKeyPressedOrFocusLostAndValueChanged
    )

    return () => {
      mfe.removeEventListener(
        "change",
        handleOnEnterKeyPressedOrFocusLostAndValueChanged
      )
      ref.current?.removeChild(mfe)
    }
  }, [])

  return (
    <div>
      <div ref={ref} />
    </div>
  )
}
