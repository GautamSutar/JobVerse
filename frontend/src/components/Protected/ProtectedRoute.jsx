import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore/authStore";
export default function ProtectedRoute({ children, allowedRoles }) {
  // const token = localStorage.getItem("authToken");
  // const role = localStorage.getItem("userRole");
  const accessToken = useAuthStore.getState().accessToken;
  const role = useAuthStore((state) => state.role);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
