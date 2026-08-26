import { Navigate, Outlet, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContextValue";

export function ProtectedRoute() {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth || auth.loading) return null;

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
