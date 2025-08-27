import ProtectedRoute from "../components/Protected/ProtectedRoute";
import ApplicantsDetailPage from "../pages/HR/ApplicantsDetailPage";
import CreateJob from "../pages/HR/CreateJob";
import HRDashboard from "../pages/HR/HRDashboard";
import JobsListPage from "../pages/HR/JobsListPage";
import ProfileCompletion from "../pages/HR/ProfileCompletion";
import SeeJobs from "../pages/HR/SeeJobs";
import NotFound from "../pages/Student/NotFound";

const HrRoutes = [
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
    element: (
      <ProtectedRoute allowedRoles="hr">
        <CreateJob />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile-completion",
    element: (
      <ProtectedRoute allowedRoles="hr">
        <ProfileCompletion />
      </ProtectedRoute>
    ),
  },
  {
    path: "/job/:jobId/applicants",
    element: (
      <ProtectedRoute allowedRoles="hr">
        <ApplicantsDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/job-list-page",
    element: (
      <ProtectedRoute allowedRoles="hr">
        <JobsListPage />
      </ProtectedRoute>
    ),
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
    path: "*",
    element: <NotFound />,
  },
];

export default HrRoutes;

