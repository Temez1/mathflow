import { Box } from "@chakra-ui/react"

export interface CardProps {
  children: React.ReactNode
  onClickHandler?: () => void
}

export default (props: CardProps) => {
  const { children, onClickHandler } = props
  return (
    <Box
      onClick={onClickHandler}
      p="4"
      borderWidth="1px"
      rounded="lg"
      boxShadow="base"
    >
      {children}
    </Box>
  )
}
