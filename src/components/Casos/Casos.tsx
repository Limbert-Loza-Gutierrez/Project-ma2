// import { headerCasos } from "../../data/headersTables";
// import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db, appFirebase } from "../../config/firebase";
// import { collection, getDocs } from "firebase/firestore";
// const auth = getAuth(appFirebase);
// const Casos = () => {
//   const [pacientes, setPacientes] = useState([]);
//   const [personal, setPersonal] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   useEffect(() => {
//     const getData = collection(db, "paciente");
//     getDocs(getData).then((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push(doc.data());
//       });
//       setPacientes(data);
//     });
//   }, []);
//   useEffect(() => {
//     const getData = collection(db, "personal");
//     getDocs(getData).then((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push(doc.data());
//       });
//       setPersonal(data);
//     });
//   }, []);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       const currentPersonal = personal.find(
//         (p) => p.correoInstitucional === user.email
//       );
//       setCurrentUser(currentPersonal);

      
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [personal]);

//   useEffect(() => {
    
//       const dataFilter = pacientes.filter(
//         (paciente) => paciente.nombreMedico === currentUser.nombre
//       );

//       if (dataFilter.length > 1) {
//         setPacientes(dataFilter);
//       }else{
//         setPacientes([])
//       }
      
    

//   }, [currentUser]);
//   console.log(pacientes)


//   return (
//     <main className="window-content">
//       <div className="title-casos">
//         <h1>Casos</h1>
//       </div>
//       {pacientes.length > 0 ? (
//         <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} />
//       ) : (
//         pacientes.length === 0 ? <h2>No hay casos registrados</h2> : <p>Loading pacientes...</p>
//       )}
//       <div></div>
//     </main>
//   );
// };
// export default Casos;
import { headerCasos } from "../../data/headersTables";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, appFirebase } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const auth = getAuth(appFirebase);

const Casos = () => {
  const [pacientes, setPacientes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const getData = collection(db, "paciente");
    const q = query(getData, where("nombreMedico", "==", currentUser.nombre));
    
    getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setPacientes(data);
      })
      .catch((error) => {
        console.error("Error fetching pacientes: ", error);
        setPacientes([]);
      });
  }, [currentUser]);

  return (
    <main className="window-content">
      <div className="title-casos">
        <h1>Casos</h1>
      </div>
      {pacientes.length > 0 ? (
        <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} />
      ) : (
        pacientes.length === 0 ? <h2>No hay casos registrados</h2> : <p>Loading pacientes...</p>
      )}
      <div></div>
    </main>
  );
};

export default Casos;
