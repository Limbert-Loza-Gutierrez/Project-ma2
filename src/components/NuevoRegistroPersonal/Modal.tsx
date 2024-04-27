import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { especialidad, expedicion } from "../../data/selectData";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { FormEvent, ChangeEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
type FormSubmitEvent = FormEvent<HTMLFormElement>;
type ChangeSelectEvent = ChangeEvent<HTMLSelectElement>;
import { getAuth } from "firebase/auth";
import {appFirebase} from "../../config/firebase";
const auth = getAuth(appFirebase);

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { updateListPersonal } = useContext(UsersContext);

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

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    handleSubmitPersonal(e);
    handleSubmitLaboral(e);
    const newPersonal = { ...inforPersonal,...inforLaboral };
    await createUserWithEmailAndPassword(auth, newPersonal.correoInstitucional, newPersonal.password)
    const docRef = collection(db, "personal");
    addDoc(docRef, newPersonal).then(
      (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      },
      (error) => {
        console.error("Error adding document: ", error);
      }
    );

    updateListPersonal(newPersonal);

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
              onchange={handleChangePersonal}
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
              onchange={handleChangePersonal}
            />
            <CustomSelect
              style={stylesCI}
              name="expedicion"
              arrayOptionsSelect={expedicion}
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
              onchange={handleChangePersonal}
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
              onchange={handleChangePersonal}
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
            <label htmlFor="">
              <h3>Especialidad</h3>
            </label>
            <CustomSelect
              name="especialidad"
              style={stylesEspecilidad}
              arrayOptionsSelect={especialidad}
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
              onchange={handleChangeLaboral}
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
