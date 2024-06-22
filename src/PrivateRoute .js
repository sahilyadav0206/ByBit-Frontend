import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth"; // Import the custom hook

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
