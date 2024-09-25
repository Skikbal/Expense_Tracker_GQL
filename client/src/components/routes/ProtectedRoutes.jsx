import React from "react";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../UI/Header";
import { useQuery } from "@apollo/client";

const ProtectedRoutes = () => {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (loading) return null;

  const isAuthenticated = data.authUser;
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;
