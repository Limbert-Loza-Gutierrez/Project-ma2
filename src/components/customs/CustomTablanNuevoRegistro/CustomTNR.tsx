import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import CustomTable from "../CustomTable/CustomTable";
import "./CustomTNR.styles.css";
import { useState } from "react";

const CustomTNR = (props) => {
  const [carnet, setCarnet] = useState("");
  const [buscarActivo, setBuscarActivo] = useState(false);
  const [userFilter, setUserFilter] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBuscarActivo(true);
    const filteredUsers = props.data.filter(paciente => paciente.documento === carnet);
    if (filteredUsers.length > 0) {
      setUserFilter(filteredUsers);
    }else{
     setUserFilter(props.data);
    
    }
   // setCarnet(""); 
  };


 const handleChange = (e) => {
  const inputValue = e.target.value;
  if (inputValue === "") {
    setBuscarActivo(false);
    setUserFilter([]); 
  }
  setCarnet(inputValue);
};
  return (
    <div className="centerTRN">
      <form action="" className="form_customtnr" onSubmit={handleSubmit}>
        <div className="buscar">
          <CustomInput
            placeholder="Inserte Carnet de Identidad"
            type="number"
            onchange={handleChange}
            value={carnet}
          />
        </div>
        <div className="boton-buscar">
          <CustomButton content="Buscar" type={
            carnet !== "" ? "submit" : "button"
          
          } />
        </div>
      </form>

      <div className="tabla">
        {buscarActivo ? (
          <CustomTable
            headerData={props.headerTablesAdminUs}
            bodyData={userFilter}
          />
        ) : (
          <CustomTable
            headerData={props.headerTablesAdminUs}
            bodyData={props.data}
          />
        )}
      </div>
    </div>
  );
};

export default CustomTNR;
