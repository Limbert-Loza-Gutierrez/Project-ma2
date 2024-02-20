import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
