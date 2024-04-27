import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import React from "react";

type props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: props) => {
  const { isLoggedIn } = useAppContext();
  if (!isLoggedIn) {
    return <Navigate to={"/"}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
