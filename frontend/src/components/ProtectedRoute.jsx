import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in
    return <Navigate to="/AuthPage" replace />;
  }
  
  let decoded;
  try {
    // const decoded = jwtDecode(token);
    decoded = jwtDecode(token); // get role from JWT
  } catch (err) {
    return <Navigate to="/AuthPage" replace />;
  }

  const role = decoded.role;
 // If role is not in allowedRoles, redirect
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/AuthPage" replace />;
  }

  // Role matches, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
