// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
// import Login from "../pages/Login/Login";
// import Signup from "../pages/Signup/signup";
import Features from "../pages/Features/Features";
// import Practice from "../pages/Practice/Practice";
import Landing from "../pages/Landing/Landing";
import PracticePage from "../pages/Interview_Practice/PracticePage";
import Singup2 from "../pages/Signup2/Singup2";
import Login2 from "../pages/Login2/Login2";
import ProfileCompletion from "../pages/HR/ProfileCompletion";
import HRDashboard from "../pages/HR/HRDashboard";
import CreateJob from "../pages/HR/CreateJob";
import StudentDashboard from "../pages/Student/StudentDashboard";
import NotFound from "../pages/Student/NotFound";
import ProtectedRoute from "../components/Protected/ProtectedRoute";
import SeeJobs from "../pages/HR/SeeJobs";
import ExploreJobsPage from "../pages/Student/ExploreJobsPage";
import JobApplicants from "../pages/HR/JobApplicants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        element: <Login2 />,
      },
      {
        path: "/signup",
        element: <Singup2 />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/practice",
        element: <PracticePage />,
      },
      {
        path: "/",
        element: <Landing />,
      },

      {
        path: "/profile-completion",
        element: <ProfileCompletion />,
      },
      {
        path: "/hr-dashboard",
        element: (
          <ProtectedRoute allowedRoles="hr">
            <HRDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-job",
        element: <CreateJob />,
      },
      {
        path: "/student-dashboard",
        element: (
          <ProtectedRoute allowedRoles="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/explore-jobs",
        element: (
          <ProtectedRoute allowedRoles="student">
            <ExploreJobsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/see-job",
        element: (
          <ProtectedRoute allowedRoles="hr">
            <SeeJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job-applicants",
        element: (
          <ProtectedRoute allowedRoles="hr">
            <JobApplicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
