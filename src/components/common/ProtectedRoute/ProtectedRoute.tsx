import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // TODO: create a good loading ui
  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
