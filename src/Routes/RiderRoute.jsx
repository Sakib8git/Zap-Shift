import React from "react";

// import Loading from "../Components/Logo/Loading/Loading";
// import Forbidden from "../Components/Forbidden/Forbidden";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <h1>Loading----------</h1>;
    // return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <h1>Forbidel</h1>;
    // return <Forbidden></Forbidden>;
  }

  return children;
};

export default RiderRoute;
