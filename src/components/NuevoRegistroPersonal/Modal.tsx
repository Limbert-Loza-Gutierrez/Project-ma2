import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { updateListPersonal } = useContext(UsersContext);
  const personalLocalStorage = JSON.parse(
    window.localStorage.getItem("listPersonal") as string
  );
  const [selectTagValue, setSelectTagValue] = useState("LP");
  const [infoPersonal, setInfoPersonal] = useState({
    imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
    nombre: "",
    documento: "",
    expedicion: "",
    password: "",
    nombreUsuario: "",
  });
  const [infoLaboral, setInfoLaboral] = useState({
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
      { ...infoPersonal, informationLaboral: infoLaboral },
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
    setInfoPersonal({
      ...infoPersonal,
      [e.target.name]: e.target.value,
      expedicion: selectTagValue,
    });
  };

  const handleChangeLaboral = (e) => {
    setInfoLaboral({
      ...infoLaboral,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectTagChange = (e) => {
    setSelectTagValue(e.target.value);
  };

  return (
    <div className="overlay">
      <div className="modalContainer1">
        <h2>Información Personal</h2>
        <form className="inputs-box" onSubmit={handleSubmitPersonal}>
          <CustomInput
            type="text"
            placeholder="Nombre"
            name="nombre"
            required
            value={infoPersonal.nombre}
            onChange={handleChangePersonal}
          />
          <div className="ci-expedition">
            <CustomInput
              type="number"
              placeholder="CI"
              name="documento"
              required
              value={infoPersonal.documento}
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
              name="expedition"
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
            value={infoPersonal.nombreUsuario}
            onChange={handleChangePersonal}
          />
          <CustomInput
            type="password"
            placeholder="Contraseña"
            name="password"
            required
            value={infoPersonal.password}
            onChange={handleChangePersonal}
          />
        </form>
        <h2>Información Laboral</h2>
        <form action="" onSubmit={handleSubmitLaboral}>
          <CustomInput
            type="email"
            placeholder="Correo Institucional"
            name="correoInstitucional"
            required
            value={infoLaboral.correoInstitucional}
            onChange={handleChangeLaboral}
          />
          <CustomInput
            type="text"
            placeholder="Especialidad"
            name="especialidad"
            required
            value={infoLaboral.especialidad}
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
