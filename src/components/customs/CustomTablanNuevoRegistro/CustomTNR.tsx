import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import CustomTable from "../CustomTable/CustomTable";
import "./CustomTNR.styles.css";


const CustomTNR = (props) => {
  return (

    <div className='centerTRN'>
      <div className='buscar'>
        <CustomInput
          placeholder='Inserte Numero de Identificacion'
          type='number'
        />
      </div>
      <div className='boton-buscar'>
        <CustomButton content='Buscar' />
      </div>
      <div className='tabla'>
        <CustomTable
          headerData={props.headerTablesAdminUs}
          bodyData={props.data}
        />
      </div>
    </div>
  );
};

export default CustomTNR;
