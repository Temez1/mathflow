import { useRoutes } from "react-router-dom"
import routes from "./routes"

export default () => {
  const routing = useRoutes(routes)

  return <div> {routing} </div>
}
