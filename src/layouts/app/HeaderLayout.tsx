import { Flex } from "@chakra-ui/react"
import responsiveConstants from "../responsiveConstants"
import { AppBarHeightInPixels } from "./AppBar"

export interface AppBarProps {
  children: React.ReactNode
}

export default (props: AppBarProps) => {
  const { children } = props
  return (
    <Flex mx={responsiveConstants.mx}>
      <Flex width="100%" height={`${AppBarHeightInPixels}px`} align="center">
        {children}
      </Flex>
    </Flex>
  )
}
