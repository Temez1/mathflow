import { RouteObject } from "react-router-dom"
import AppLayout from "./layouts/app/App"
import LearningSessionLayout from "./layouts/LearningSession"
import Learn from "./views/learn/Learn"
import LearningSession from "./views/learningSession/LearningSession"
import Profile from "./views/profile/Profile"
import Progress from "./views/progress/Progress"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
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
  {
    path: "/learning",
    element: <LearningSessionLayout />,
    children: [
      {
        path: "/learning/",
        element: <LearningSession />,
      },
    ],
  },
]

export default routes
