import { headerCasos } from "../../data/headersTables";
import listUsers from "../../data/listUsers";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import UsersContext from "../../context/UsersContext";
import { useContext, useEffect, useState } from "react";
const Casos = () => {
    const [pacientes, setPacientes] = useState([]);
    // const { pacientes } = useContext(UsersContext);
    // const pacientes = JSON.parse(window.localStorage.getItem("listPacientes") as string);
    // const data = listUsers.pacientes;
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
            {/* <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} /> */}
            {pacientes.length > 0 ? (
                <CustomTNR headerTablesAdminUs={headerCasos} data={pacientes} />
            ) : (
                <p>Loading pacientes...</p>
            )}
        </main>
    );
};
export default Casos;
