import { useLayoutEffect, useRef } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import { OutputFormat } from "mathlive/dist/public/mathfield"

const IS_DEV = import.meta.env.DEV
const RELATIVE_PUBLIC_DIR_PATH = IS_DEV ? "../../" : "../"

export interface MathFieldProps {
  initialValue?: string
  onChange?: (newValue: string) => void
  onEnterKeyPressedOrFocusLostAndValueChanged?: (newValue: string) => void
  format?: OutputFormat
  readOnly?: boolean
}

export default ({
  initialValue = undefined,
  onChange = () => null,
  onEnterKeyPressedOrFocusLostAndValueChanged = () => null,
  format = "latex",
  readOnly = false,
}: MathFieldProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const mfe = new MathfieldElement({
    virtualKeyboardMode: "manual",
    fontsDirectory: ".",
    soundsDirectory: RELATIVE_PUBLIC_DIR_PATH,
    readOnly,
  })

  mfe.setValue(initialValue)

  mfe.addEventListener("input", () => {
    onChange(mfe.getValue(format))
  })

  mfe.addEventListener("change", () => {
    onEnterKeyPressedOrFocusLostAndValueChanged(mfe.getValue(format))
  })

  useLayoutEffect(() => {
    ref.current?.appendChild(mfe)
  }, [])

  return <div ref={ref} />
}
