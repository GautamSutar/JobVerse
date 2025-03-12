// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/signup";
import Features from "../pages/Features/Features";
import Practice from "../pages/Practice/Practice";
import Landing from "../pages/Landing/Landing";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/practice",
        element: <Practice />,
      },
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
]);

export default router;
