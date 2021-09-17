import { useLayoutEffect, useRef } from "react"

import { MathfieldElement } from "mathlive"
import "mathlive/dist/mathlive-fonts.css"

export interface MathDisplayProps {
  value: Latex
}

export default (props: MathDisplayProps) => {
  const { value } = props
  const ref = useRef<HTMLDivElement>(null)

  const mfe = new MathfieldElement({
    fontsDirectory: ".",
    readOnly: true,
  })

  console.log("Math display value", value)

  mfe.setValue(value)

  useLayoutEffect(() => {
    console.log("Adding math display to DOM")
    ref.current?.appendChild(mfe)
  }, [])

  return <div ref={ref} />
}
