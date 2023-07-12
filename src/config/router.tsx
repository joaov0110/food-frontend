import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Dashboard from "../views/Dashboard";
import Points from "../views/Points";
import NotFound from "../views/NotFound";
import Point from "../views/Points/Point";
import Profile from "../views/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "points",
            element: <Points />,
          },
          {
            path: "points/:point_id",
            element: <Point />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
