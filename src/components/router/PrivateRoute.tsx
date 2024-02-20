import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
// import { LOGIN } from "../../config/paths/paths";
import AuthContext from "../../context/AuthContext";
import Layout from "../../layout/Layout";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <Layout />
      {/* <Outlet /> */}
    </>
  );
};

export default PrivateRoute;
