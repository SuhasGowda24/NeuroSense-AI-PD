import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  const location = useLocation();
  if (!token) {
    // Not logged in — redirect to AuthPage and include original location so we can return after login
    return <Navigate to="/AuthPage" state={{ from: location }} replace />;
  }
  let decoded;
  try {
    // const decoded = jwtDecode(token);
    decoded = jwtDecode(token); // get role from JWT
  } catch (err) {
    return <Navigate to="/AuthPage" state={{ from: location }} replace />;
  }
  const role = decoded.role;
 // If role is not in allowedRoles, redirect
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/AuthPage" state={{ from: location }} replace />;
  }
  // Role matches, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
