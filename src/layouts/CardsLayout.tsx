import { SimpleGrid } from "@chakra-ui/react"
import { bottomNavBarHeightInPixels } from "./app/BottomNavBar"
import responsiveConstants from "./responsiveConstants"

export interface AppBarProps {
  children: React.ReactNode
}

export default (props: AppBarProps) => {
  const { children } = props
  return (
    <SimpleGrid
      columns={responsiveConstants.columns}
      spacing={responsiveConstants.spacing}
      mx={responsiveConstants.mx}
      mb={{
        base: `${
          bottomNavBarHeightInPixels + responsiveConstants.spacing.base * 4
        }px`,
      }}
    >
      {children}
    </SimpleGrid>
  )
}
