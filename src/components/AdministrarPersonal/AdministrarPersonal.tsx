import { useEffect, useState, useContext } from "react";
import { headerTablesAdminUs } from "../../data/headersTables";
import CustomTNR from "../customs/CustomTablanNuevoRegistro/CustomTNR";
import NuevoRegistroPersonal from "../NuevoRegistroPersonal/NuevoRegistroPersonal.tsx";
import ModificarPersonal from "../ModificarPersonal/ModificarPersonal.tsx";
import UsersContext from "../../context/UsersContext";
import {collection,getDocs} from "firebase/firestore";
import { db } from "../../config/firebase";
const AdministrarPersonal = () => {
  const { personal } = useContext(UsersContext);
  const [personalList, setPersonalList] = useState([]);
  
  useEffect(() => {
    const getPersonal = collection(db, "personal");
    getDocs(getPersonal).then((res) => {
      setPersonalList(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [
    localStorage, personal
  ])

  return (
    <main className=' window-content '>
      <div>
      <h1>Personal</h1>
    </div>
      {
        personalList.length > 0 ? (
          <CustomTNR headerTablesAdminUs={headerTablesAdminUs} data={personalList} />
        ) : (
          <p>Loading personal...</p>
        )
      }
      <div className='nuevo-registro'>
        <NuevoRegistroPersonal />
        <ModificarPersonal/>
      </div>
    </main>
  );
};

export default AdministrarPersonal;
