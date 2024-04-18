// import { useEffect, useState } from "react";
// import CustomSidebarOptions from "./CustomSidebarOptions";
// import "./CustomSidebar.styles.css";
// import AuthContext from "../../../context/AuthContext";
// import { opcionesAdmin, opcionesPsicologo } from "../../../data/optionsSidebar";
// import { collection, getDocs } from "firebase/firestore";
// import { db, appFirebase } from "../../../config/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// const auth = getAuth(appFirebase);

// const CustomSidebar = () => {
//   const [userData, setUserData] = useState();
//   const [userList, setUserList] = useState();

//   useEffect(() => {
//     const getPersonal = collection(db, "personal");
//     getDocs(getPersonal).then((res) => {
//       setUserList(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     });
//   }, []);

//   onAuthStateChanged(auth, (userFirebase) => {
//     if (userFirebase) {
//       setUserData(
//         userList?.find(
//           (user) => user.correoInstitucional === userFirebase?.email
//         )
//       );
//       console.log("userData: ", userData);
//     } else {
//       setUserData(null);
//     }
//   });

//   const opciones =
//     userData?.nombreUsuario !== "admin" ? opcionesPsicologo : opcionesAdmin;
//   return (
//     <>
//       {userData === undefined || userData === null ? (
//         <div>Cargando...</div>
//       ) : (
//         <CustomSidebarOptions data_user={userData} opciones={opciones} />
//       )}
//     </>
//   );
// };

// export default CustomSidebar;

import { useEffect, useState } from "react";
import CustomSidebarOptions from "./CustomSidebarOptions";
import "./CustomSidebar.styles.css";
import { opcionesAdmin, opcionesPsicologo } from "../../../data/optionsSidebar";
import { collection, getDocs } from "firebase/firestore";
import { db, appFirebase } from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);

const CustomSidebar = () => {
  const [userData, setUserData] = useState();
  const [userList, setUserList] = useState();

  useEffect(() => {
    const getPersonal = collection(db, "personal");
    getDocs(getPersonal).then((res) => {
      setUserList(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      const currentEmail = userFirebase?.email;
      setUserData(
        userList?.find(
          (user) => user?.correoInstitucional === userFirebase?.email
        )
      );
    } else {
      setUserData(null);
    }
  });
  const opciones =
    userData?.nombreUsuario !== "admin" ? opcionesPsicologo : opcionesAdmin;

  return (
    <>
      {userData && (
        <CustomSidebarOptions data_user={userData} opciones={opciones} />
      )}
    </>
  );
};

export default CustomSidebar;
