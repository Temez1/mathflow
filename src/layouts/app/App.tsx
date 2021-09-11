import { Outlet } from "react-router-dom"
import BottomNavBar from "./BottomNavBar"

export default () => (
  <>
    <Outlet />
    <BottomNavBar />
  </>
)
