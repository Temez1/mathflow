import { SimpleGrid } from "@chakra-ui/react"
import { AppBarHeightInPixels } from "./app/AppBar"
import { bottomNavBarHeightInPixels } from "./app/BottomNavBar"
import responsiveConstants from "./responsiveConstants"

export interface AppBarProps {
  children: React.ReactNode
  withAppBar?: boolean
}

export default ({ children, withAppBar = false }: AppBarProps) => (
  <SimpleGrid
    columns={responsiveConstants.columns}
    spacing={responsiveConstants.spacing}
    mx={responsiveConstants.mx}
    mt={
      withAppBar
        ? {
            base: `${
              AppBarHeightInPixels + responsiveConstants.spacing.base * 4
            }px`,
          }
        : responsiveConstants.spacing
    }
    mb={{
      base: `${
        bottomNavBarHeightInPixels + responsiveConstants.spacing.base * 4
      }px`,
    }}
  >
    {children}
  </SimpleGrid>
)
