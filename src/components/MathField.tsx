import { useLayoutEffect, useRef } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"
import "mathlive/dist/sounds/plonk.wav"
import "mathlive/dist/sounds/keypress-standard.wav"
import "mathlive/dist/sounds/keypress-delete.wav"
import "mathlive/dist/sounds/keypress-return.wav"
import "mathlive/dist/sounds/keypress-spacebar.wav"
import { OutputFormat } from "mathlive/dist/public/mathfield"

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
  const ref = useRef<HTMLDivElement>(null)

  const mfe = new MathfieldElement({
    virtualKeyboardMode: "manual",
    fontsDirectory: ".",
    soundsDirectory: ".",
  })

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
