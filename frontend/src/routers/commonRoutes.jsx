import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Features from "../pages/Features/Features";
import Landing from "../pages/Landing/Landing";
import LoginForm from "../pages/Login2/Login2";
import StudentSignupForm from "../pages/Signup2/Singup2";
import NotFound from "../pages/Student/NotFound";

const commonRoutes = [
  {
    path: "/",
    element: <Landing />,
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
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <StudentSignupForm />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default commonRoutes;
