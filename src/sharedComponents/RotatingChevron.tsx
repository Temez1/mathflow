import { Icon } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { MdExpandMore } from "react-icons/md"

export interface RotatingChevronProps {
  up: boolean
}

export default (props: RotatingChevronProps) => {
  const { up } = props
  const chevronIconRotationDuration = 0.3

  return (
    <motion.div
      initial={up ? "close" : "open"}
      variants={{
        open: {
          rotate: 0,
          transition: { duration: chevronIconRotationDuration },
        },
        close: {
          rotate: 180,
          transition: { duration: chevronIconRotationDuration },
        },
      }}
      animate={up ? "close" : "open"}
    >
      <Icon boxSize="8" as={MdExpandMore} />
    </motion.div>
  )
}
