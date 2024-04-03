import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { FormEvent, ChangeEvent } from "react";
import Layout from './../../layout/Layout';
type FormSubmitEvent = FormEvent<HTMLFormElement>;
type ChangeInputEvent = ChangeEvent<HTMLInputElement>;
type ChangeSelectEvent = ChangeEvent<HTMLSelectElement>;

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
    especialidad: "",
    password: "",
    nombreUsuario: "",
  });
  const [inforLaboral, setInforLaboral] = useState({
    tipoLaboral: "Medico",
    correoInstitucional: "",
    estado: "Activo",
    nivelJerarquico: "Medico",
  });
  if (!open) return null;

  const handleSubmit = (e: FormSubmitEvent) => {
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
  const handleSubmitPersonal = (e: FormSubmitEvent) => {
    e.preventDefault();
  };
  const handleSubmitLaboral = (e: FormSubmitEvent) => {
    e.preventDefault();
  };
  const handleChangePersonal = (e: ChangeSelectEvent) => {
    setInforPersonal({
      ...inforPersonal,
      [e.target.name]: e.target.value,
      expedicion: selectTagValue,
      especialidad: especialidadSelect,
    });
  };
  const handleChangeLaboral = (e: ChangeSelectEvent) => {
    setInforLaboral({
      ...inforLaboral,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectTagChange = (e: ChangeSelectEvent) => {
    setSelectTagValue(e.target.value);
  };

  const handleSelectEspecialidad = (e: ChangeSelectEvent) => {
    setEspecialidadSelect(e.target.value);
  };

  const stylesCI = {
    width: "100%",
    height: "40px",
    marginBottom: "30px",
    marginTop: "19px ",
    textAlign: "center",
    borderRadius: "5px",
  };
  const stylesEspecilidad = {
    width: "94%",
    height: "40px",
    marginBottom: "30px",
    marginTop: "19px",
    textAlign: "center",
    borderRadius: "5px",
  };
  const optiosExpedicion = [
    "Seleccione una Ciudad de Expedición",
    "La Paz",
    "Cochabamba",
    "Santa Cruz",
    "Beni",
    "Pando",
    "Oruro",
    "Chuquisaca",
    "Tarija",
    "Potosi",
  ];

  return (
    <div className="overlay ">
      <div className="modalContainer1">
        <h2>Información Personal</h2>
        <form className="inputs-box" onSubmit={handleSubmitPersonal}>
          <div className="nombre input-box__option">
            <CustomInput
              label="Nombre Completo"
              type="text"
              placeholder="Nombre"
              name="nombre"
              required
              value={inforPersonal.nombre}
              onChange={handleChangePersonal}
            />
          </div>
          <div className="ci-expedicion input-box__option">
            <CustomInput
              label="Cédula de Identidad"
              type="number"
              placeholder="Cédula de Identidad"
              name="documento"
              required
              value={inforPersonal.documento}
              onChange={handleChangePersonal}
            />
            <CustomSelect
              style={stylesCI}
              name="expedicion"
              arrayOptionsSelect={optiosExpedicion}
              onChange={handleSelectTagChange}
              value={selectTagValue}
            />
          </div>
          <div className="nombre-usuario">
            <CustomInput
              label="Nombre de Usuario"
              type="text"
              placeholder="Nombre de Usuario"
              name="nombreUsuario"
              required
              value={inforPersonal.nombreUsuario}
              onChange={handleChangePersonal}
            />
          </div>
          <div className="password__container">
            <CustomInput
              label="Contraseña"
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
        <form action="" className="form__group" onSubmit={handleSubmitLaboral}>
          <div className="especialidad">
              <label htmlFor=""><h3>Especialidad</h3></label>
            <CustomSelect
              
              name="especialidad"
              style={stylesEspecilidad}
              arrayOptionsSelect={[
                "Seleccione una Especialidad",
                "Psicólogo",
                "Admin",
              ]}
              onChange={handleSelectEspecialidad}
              value={especialidadSelect}
            />
          </div>
          <div className="correo">
            <CustomInput
              label="Correo Institucional"
              type="email"
              placeholder="Correo Institucional"
              name="correoInstitucional"
              required
              value={inforLaboral.correoInstitucional}
              onChange={handleChangeLaboral}
            />
          </div>
        </form>
        <div className="buttons-box ">
          <CustomButton content="Cancelar" onClick={onClose} />
          <CustomButton content="Guardar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
