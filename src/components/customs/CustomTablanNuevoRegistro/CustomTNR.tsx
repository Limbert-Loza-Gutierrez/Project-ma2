import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import CustomTable from "../CustomTable/CustomTable";
import "./CustomTNR.styles.css";
import { useState } from "react";


const CustomTNR = (props) => {
  const [carnet, setCarnet] = useState('');
  const [buscarActivo, setBuscarActivo] = useState(false);
  const [userFilter, setUserFilter] = useState([]);
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setBuscarActivo(true);
    props.data.map((paciente) => {
      paciente.documento === carnet ? setUserFilter([paciente]) : null;
      carnet === '' ? setBuscarActivo(false) : null;
      // console.log(paciente.documento);
      // paciente.documento === carnet ? setUserFilter([paciente]) : null
    }
    );

  }
  const handleChange = (e) => {
    if(e.target.value === ''){
      setBuscarActivo(false);


    }
    setCarnet(e.target.value);
  }
  return (

    <div className='centerTRN'>
      <form action="" onSubmit={handleSubmit}>
        <div className='buscar'>
          <CustomInput
            placeholder='Inserte Carnet de Identidad'
            type='number'
            onChange={handleChange}
            value={carnet}
          />
        </div>
        <div className='boton-buscar'>
          <CustomButton content='Buscar'
            type="submit" />

        </div>
      </form>
      <div className='tabla'>
        {
          buscarActivo ? <CustomTable
            headerData={props.headerTablesAdminUs}
            bodyData={userFilter}
          /> : <CustomTable
            headerData={props.headerTablesAdminUs}
            bodyData={props.data}
          />

        }

      </div>
    </div>
  );
};

export default CustomTNR;
