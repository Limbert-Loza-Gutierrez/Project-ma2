import { useEffect, useState, useContext } from "react";
import { headerTablesAdminUs } from "../../data/headersTables";
import listUsers from "../../data/listUsers.ts";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import NuevoRegistroPersonal from "../NuevoRegistroPersonal/NuevoRegistroPersonal.tsx";
import UsersContext from "../../context/UsersContext";
const AdministrarPersonal = () => {
  const { personal } = useContext(UsersContext);

  const [personalList, setPersonalList] = useState([]);
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("listPersonal") as string);
    if (data) {
      setPersonalList(data);
    }
  }, [
    localStorage, personal
  ])

  return (
    <main className=' window-content '>
      {
        personalList.length > 0 ? (
          <CustomTNR headerTablesAdminUs={headerTablesAdminUs} data={personalList} />
        ) : (
          <p>Loading personal...</p>
        )
      }
      <div className='nuevo-registro'>
        <NuevoRegistroPersonal />
      </div>
    </main>
  );
};

export default AdministrarPersonal;
