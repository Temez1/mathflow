import { useLayoutEffect, useRef } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import { OutputFormat } from "mathlive/dist/public/mathfield"

const IS_DEV = import.meta.env.DEV
const RELATIVE_PUBLIC_DIR_PATH = IS_DEV ? "../../" : "../"

export interface MathFieldProps {
  onChange?: (newValue: string) => void
  onEnterKeyPressedOrFocusLostAndValueChanged?: (newValue: string) => void
  format?: OutputFormat
}

export default ({
  onChange = () => null,
  onEnterKeyPressedOrFocusLostAndValueChanged = () => null,
  format = "latex",
}: MathFieldProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const mfe = new MathfieldElement({
    virtualKeyboardMode: "manual",
    fontsDirectory: ".",
    soundsDirectory: RELATIVE_PUBLIC_DIR_PATH,
  })

  mfe.addEventListener("input", () => {
    onChange(mfe.getValue(format))
  })

  mfe.addEventListener("change", () => {
    console.log("Mfe value", mfe.value)

    if (mfe.value !== "") {
      onEnterKeyPressedOrFocusLostAndValueChanged(mfe.getValue(format))
      mfe.setValue("")
    }
  })

  useLayoutEffect(() => {
    console.log("Adding math field to DOM")

    ref.current?.appendChild(mfe)

    return () => {
      console.log("Removing math field from DOM")
      ref.current?.removeChild(mfe)
    }
  }, [])

  return (
    <div>
      <div ref={ref} />
    </div>
  )
}
