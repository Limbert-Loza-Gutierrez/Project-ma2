
import { headerCasosAdmin } from "../../data/headersTables";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import {  useEffect, useState } from "react";
const Casos = () => {
  const [pacientes, setPacientes] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("listPacientes") as string);
    console.log(data);
    if (data) {
      setPacientes(data);
    }
  }, [
    localStorage
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
