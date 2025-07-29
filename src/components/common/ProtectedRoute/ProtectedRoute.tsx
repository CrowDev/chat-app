import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { Spinner } from "../Spinner/Spinner";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-dvh grid place-content-center bg-light-main-bg dark:bg-dark-main-bg text-light-primary-text dark:text-dark-primary-text">
        <Spinner size={48} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
