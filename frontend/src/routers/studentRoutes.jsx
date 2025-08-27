import ProtectedRoute from "../components/Protected/ProtectedRoute";
import TestRoom from "../pages/Student/aptitude-interview-practice/aptitude/TestRoom";
import ExploreJobsPage from "../pages/Student/ExploreJobsPage";
import NotFound from "../pages/Student/NotFound";
import StudentDashboard from "../pages/Student/StudentDashboard";

const StudentRoutes = [
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
    path: "/aptitude",
    element: (
      <ProtectedRoute allowedRoles="student">
        <TestRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default StudentRoutes;
