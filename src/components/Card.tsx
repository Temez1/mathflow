import { Box } from "@chakra-ui/react"

export interface CardProps {
  children: React.ReactNode
}

export default (props: CardProps) => {
  const { children } = props
  return (
    <Box p="4" borderWidth="1px" rounded="lg" boxShadow="base">
      {children}
    </Box>
  )
}
