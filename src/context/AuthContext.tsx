import { useState, useEffect, createContext, FC, ReactNode } from "react";
import { appFirebase } from "../config/firebase";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
const auth = getAuth(appFirebase);

// const MY_AUTH_APP = "my-auth-app";
type AuthContextType = {
  isAuthenticated: boolean | null;
  inforUser: any;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(() =>
  //   window.localStorage.getItem(MY_AUTH_APP)
  // );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inforUser, setInforUser] = useState({});
  const [userList, setUserList] = useState([]);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setInforUser(userList.find((user) => user.correo === userFirebase?.email));
      setIsAuthenticated(true);
    } else {
      setInforUser(null);
    }
  });
  useEffect(() => {
    const getPersonal = collection(db, "personal");
    getDocs(getPersonal).then((res) => {
      setUserList(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  

  // const Login = () => {
  //   window.localStorage.setItem(MY_AUTH_APP, true);
  //   setIsAuthenticated("true");
  // };
  const Logout = async () => {
    // window.localStorage.removeItem(MY_AUTH_APP);
    // window.localStorage.removeItem("inforUser");
    await signOut(auth);
    setIsAuthenticated(false);
    
  };
  // const updateUserInfo = (info) => {
  //   window.localStorage.setItem("inforUser", JSON.stringify(info));
  //   setInforUser(info);
  // };
  const value = {
    isAuthenticated,
    // Login,
    Logout,
    inforUser    // updateUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//

export { AuthContextProvider };
export default AuthContext;
