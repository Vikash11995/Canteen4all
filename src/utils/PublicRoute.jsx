import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  // If children exist, render them. For nested routes, use <Outlet />
  return children ? children : <Outlet />;
}