import { PartialRouteObject } from "react-router-dom"
import Layout from "./layouts/Main"
import Learn from "./views/Learn"
import Profile from "./views/Profile"
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
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]

export default routes
