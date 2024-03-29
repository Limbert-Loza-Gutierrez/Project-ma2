import { headerCasos } from "../../data/headersTables";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
const Casos = () => {

  const [pacientes, setPacientes] = useState([]);
  const infMedico = JSON.parse(
    window.localStorage.getItem("inforUser") as string
  );
  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem("listPacientes") as string
    );
    const dataFilter = data.filter(
      (paciente) => paciente.nombreMedico === infMedico.nombre
    );

    if (dataFilter) {
      setPacientes(dataFilter);
    }
  }, [localStorage]);




  
  return (
    <main className="window-content">
      <div className="title-casos">
        <h1>Casos</h1>
      </div>
      {pacientes.length > 0 ? (
        <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} />
      ) : (
        <p>Loading pacientes...</p>
      )}
      <div>
       
      </div>
    </main>
  );
};
export default Casos;
