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

  mfe.setValue(value)

  useLayoutEffect(() => {
    ref.current?.appendChild(mfe)
    return () => {
      ref.current?.removeChild(mfe)
    }
  }, [value])

  return (
    <div>
      <div ref={ref} />
    </div>
  )
}
