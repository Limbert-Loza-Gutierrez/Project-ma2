import { useState, createContext, FC, ReactNode } from "react";

const MY_AUTH_APP = "my-auth-app";
type AuthContextType = {
  isAuthenticated: string | null;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    window.localStorage.getItem(MY_AUTH_APP)
  );
  const [inforUser, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem("inforUser") as string) || {}
  );

  const Login = () => {
    window.localStorage.setItem(MY_AUTH_APP, true);
    setIsAuthenticated("true");
  };
  const Logout = () => {
    window.localStorage.removeItem(MY_AUTH_APP);
    window.localStorage.removeItem("inforUser");
    // window.localStorage.removeItem("listPacientes");
    setIsAuthenticated(false);
  };
  const updateUserInfo = (info) => {
    window.localStorage.setItem("inforUser", JSON.stringify(info));
    setUserInfo(info);
  };

  const value = {
    isAuthenticated,
    Login,
    Logout,
    inforUser,
    updateUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//

export { AuthContextProvider };
export default AuthContext;
