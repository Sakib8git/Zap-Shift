import React from "react";

import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Logo/Loading/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    // return <h1>Loading......</h1>;
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    // return <h1>Forbidden......</h1>;
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
