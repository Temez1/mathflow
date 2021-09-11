import { Box, Icon } from "@chakra-ui/react"
import { MdClose } from "react-icons/md"
import { Outlet, useNavigate } from "react-router-dom"
import responsiveConstants from "./responsiveConstants"

export default () => {
  const navigate = useNavigate()

  const exitButtonSize = 12
  const exitButtonSpacingTop = 4

  return (
    <>
      <Box
        as="button"
        position="fixed"
        top={exitButtonSpacingTop}
        right={responsiveConstants.mx}
        onClick={() => navigate("/")}
      >
        <Icon
          aria-label="Exit learning session"
          boxSize={exitButtonSize}
          as={MdClose}
          // Hack to align the Icon to margin (Icon width/2)
          mr={`${-10}px`}
        />
      </Box>
      <Box
        h="100vh"
        mx={responsiveConstants.mx}
        pt={`${(exitButtonSize + exitButtonSpacingTop) * 4}px`}
        pb="10"
      >
        <Outlet />
      </Box>
    </>
  )
}
