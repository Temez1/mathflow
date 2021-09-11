import { Box } from "@chakra-ui/react"
import responsiveConstants from "../responsiveConstants"

export interface AppBarProps {
  children: React.ReactNode
}

export const AppBarHeightInPixels = 56

export default (props: AppBarProps) => {
  const { children } = props
  return (
    <Box mx={responsiveConstants.mx}>
      <Box width="100%" height={`${AppBarHeightInPixels}px`}>
        {children}
      </Box>
    </Box>
  )
}
