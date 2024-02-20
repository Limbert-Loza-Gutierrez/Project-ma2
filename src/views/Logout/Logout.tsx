import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Logout = () => {
  const { Logout } = useContext(AuthContext);
  useEffect(() => {
    Logout();
  });
  return null;
};

export default Logout;
