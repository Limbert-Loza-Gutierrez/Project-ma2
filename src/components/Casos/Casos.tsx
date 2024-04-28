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
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       const currentPersonal = personal.find(
//         (p) => p.correoInstitucional === user.email
//       );
//       setCurrentUser(currentPersonal);

//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);
  

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
import { collection, getDocs } from "firebase/firestore";

const auth = getAuth(appFirebase);

const Casos = () => {
  const [pacientes, setPacientes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getData = collection(db, "paciente");
    getDocs(getData).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setPacientes(data);
    });
  }, []);

  useEffect(() => {
    const getData = collection(db, "personal");
    getDocs(getData).then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const user = getAuth().currentUser;
      if (user) {
        const currentPersonal = data.find(
          (p) => p.correoInstitucional === user.email
        );
        setCurrentUser(currentPersonal);
      }
    });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentPersonal = data.find(
          (p) => p.correoInstitucional === user.email
        );
        setCurrentUser(currentPersonal);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Filtrar la lista de pacientes basada en el nombre del médico actual
    if (currentUser) {
      let filteredPacientes = pacientes.filter(
        (paciente) => paciente.nombreMedico === currentUser.nombre
      );
      filteredPacientes = filteredPacientes.sort((a, b) => b.order - a.order);

      setPacientes(filteredPacientes);
    }
  }, [currentUser, pacientes]); // Asegúrate de ejecutar este efecto cuando currentUser o pacientes cambien

  return (
    <main className="window-content">
      <div className="title-casos">
        <h1>Casos</h1>
      </div>
      {pacientes.length > 0 ? (
        <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} />
      ) : (
        <h2>No hay casos registrados</h2>
      )}
      <div></div>
    </main>
  );
};

export default Casos;
