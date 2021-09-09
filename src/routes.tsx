import { PartialRouteObject } from "react-router-dom"
import Layout from "./Layout"
import Learn from "./views/Learn"
import Progress from "./views/Progress"

const routes: [PartialRouteObject] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Learn />,
      },
      {
        path: "/progress",
        element: <Progress />,
      },
    ],
  },
]

export default routes
