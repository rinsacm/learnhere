import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setAuth({ roles: [localStorage.getItem("role")] });
    console.log(auth);
  }, []);
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location} replace />
  );
};
export default ProtectedRoute;
