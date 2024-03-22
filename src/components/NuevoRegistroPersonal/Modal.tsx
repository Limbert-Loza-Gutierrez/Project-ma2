import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";
import { FaRegEyeSlash,FaRegEye  } from "react-icons/fa6";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { updateListPersonal } = useContext(UsersContext);
  const personalLocalStorage = JSON.parse(
    window.localStorage.getItem("listPersonal") as string
  );
  const [selectTagValue, setSelectTagValue] = useState("LP");
  const [especialidadSelect, setEspecialidadSelect] = useState("");
  const [inforPersonal, setInforPersonal] = useState({
    imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
    nombre: "",
    documento: "",
    expedicion: "",
    password: "",
    nombreUsuario: "",
  });
  const [inforLaboral, setInforLaboral] = useState({
    tipoLaboral: "Medico",
    correoInstitucional: "",
    especialidad: "",
    estado: "Activo",
    nivelJerarquico: "Medico",
  });
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitPersonal(e);
    handleSubmitLaboral(e);
    const newPersonal = [
      ...personalLocalStorage,
      { ...inforPersonal, informacionLaboral: inforLaboral },
    ];
    updateListPersonal(newPersonal);
    console.log(newPersonal);
    onClose();
  };
  const handleSubmitPersonal = (e) => {
    e.preventDefault();
  };
  const handleSubmitLaboral = (e) => {
    e.preventDefault();
  };
  const handleChangePersonal = (e) => {
    setInforPersonal({
      ...inforPersonal,
      [e.target.name]: e.target.value,
      expedicion: selectTagValue,
    });
  };
  const handleChangeLaboral = (e) => {
    setInforLaboral({
      ...inforLaboral,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectTagChange = (e) => {
    setSelectTagValue(e.target.value);
  };

  return (
    <div className="overlay ">
      <div className="modalContainer1">
        <h2>Información Personal</h2>
        <form className="inputs-box" onSubmit={handleSubmitPersonal}>
          <CustomInput
          
            type="text"
            placeholder="Nombre"
            name="nombre"
            required
            value={inforPersonal.nombre}
            onChange={handleChangePersonal}
          />
          <div className="ci-expedicion">
            <CustomInput
            
              type="number"
              placeholder="CI"
              name="documento"
              required
              value={inforPersonal.documento}
              onChange={handleChangePersonal}
            />
            <CustomSelect
              style={{
                width: "100%",
                height: "40px",
                marginBottom: "30px",
                marginTop: "19px",
                textAlign: "center",
                borderRadius: "5px",
              }}
              name="expedicion"
              arrayOptionsSelect={[
                "LP",
                "CBBA",
                "SC",
                "BN",
                "PT",
                "OR",
                "CH",
                "TJ",
                "PA",
              ]}
              onChange={handleSelectTagChange}
              value={selectTagValue}
            />
          </div>
          <CustomInput
            type="text"
            placeholder="Nombre de Usuario"
            name="nombreUsuario"
            required
            value={inforPersonal.nombreUsuario}
            onChange={handleChangePersonal}
          />
          <div className="password__container">
          <CustomInput
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            name="password"
            required
            value={inforPersonal.password}
            onChange={handleChangePersonal}
          />
          <p
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </p>
          </div>
        </form>
        <h2>Información Laboral</h2>
        <form action="" onSubmit={handleSubmitLaboral}>
          <CustomInput
            type="email"
            placeholder="Correo Institucional"
            name="correoInstitucional"
            required
            value={inforLaboral.correoInstitucional}
            onChange={handleChangeLaboral}
          />
          <CustomInput
            type="text"
            placeholder="Especialidad"
            name="especialidad"
            required
            value={inforLaboral.especialidad}
            onChange={handleChangeLaboral}
          />
        </form>
        <div className="buttons-box">
          <CustomButton content="Cancelar" onClick={onClose} />
          <CustomButton content="Guardar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
