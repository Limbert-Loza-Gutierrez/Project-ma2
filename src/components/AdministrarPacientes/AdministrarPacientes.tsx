
import { headerCasosAdmin } from "../../data/headersTables";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import {  useEffect, useState } from "react";
import {collection,getDocs} from "firebase/firestore";
import { db } from "../../config/firebase";
const Casos = () => {
  const [pacientes, setPacientes] = useState([]);
  
  useEffect(() => {
    const getPacientes = collection(db, "paciente");
    getDocs(getPacientes).then((res) => {
      let dataPacientes = res.docs.map((doc) => ({ ...doc.data(), id: doc.idDoc }))
      dataPacientes = dataPacientes.sort((a, b) => b.order - a.order);
      setPacientes(dataPacientes);
      
    });
  }, [
  ])
  return (
    <main className="window-content">
      <div>
      <h1>Pacientes</h1>
    </div>
      {pacientes.length > 0 ? (
        <CustomTNR headerTablesAdminUs={headerCasosAdmin} data={pacientes} />
      ) : (
        <p>Loading pacientes...</p>
      )}
    </main>
  );
};
export default Casos;
