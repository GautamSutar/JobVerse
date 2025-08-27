import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import commonRoutes from "./commonRoutes";
import HrRoutes from "./hrRoutes";
import StudentRoutes from "./studentRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...commonRoutes,
      ...HrRoutes,
      ...StudentRoutes
    ],
  },
]);

export default router;
