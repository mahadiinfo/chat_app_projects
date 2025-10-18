import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector(
    (state) => state.userReducers
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!screenLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, screenLoading]);
  return children;
};

export default ProtectedRoutes;
