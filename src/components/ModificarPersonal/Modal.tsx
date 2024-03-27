import { useState } from "react";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import CustomButton from "../customs/CustomButton/CustomButton";
import { useContext } from "react";
import UsersContext from "../../context/UsersContext";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { updateListPersonal } = useContext(UsersContext);
  const [personalSelect, setPersonalSelect] = useState("");
  const [verModificarPassowrd, setVerModificarPassword] = useState(false);
  const [verDesactivarUsuario, setVerDesactivarUsuario] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let personal = JSON.parse(
    window.localStorage.getItem("listPersonal") as string
  );
  personal = personal.filter((personal) => personal.nombreUsuario !== "admin");
  if (!open) return null;
  const nombresPersonal = personal.map((personal: any) => personal.nombre);
  const handleCustomSelect = (e, functionSelect) => {
    functionSelect(e.target.value);
  };
  const dataPersonal = personal.filter(
    (personal) => personal.nombre === personalSelect
  );

  const inactivarUsuario = () => {
    const data = JSON.parse(
      window.localStorage.getItem("listPersonal") as string
    );
    const newData = data.map((personal) => {
      if (personal.nombre === personalSelect) {
        personal.informacionLaboral.estado = "Inactivo";
      }
      return personal;
    });
    updateListPersonal(newData);
    window.localStorage.setItem("listPersonal", JSON.stringify(newData));
    onClose();
    setPersonalSelect("");
    setVerModificarPassword(false);
            setVerDesactivarUsuario(false);
  };
  const activarUsuario = () => {
    const data = JSON.parse(
      window.localStorage.getItem("listPersonal") as string
    );
    const newData = data.map((personal) => {
      if (personal.nombre === personalSelect) {
        personal.informacionLaboral.estado = "Activo";
      }
      return personal;
    });
    updateListPersonal(newData);
    window.localStorage.setItem("listPersonal", JSON.stringify(newData));
    onClose();
    setPersonalSelect("");
    setVerModificarPassword(false);
            setVerDesactivarUsuario(false);
  };
  const modificarPassword = () => {
    const data = JSON.parse(
      window.localStorage.getItem("listPersonal") as string
    );
    const newData = data.map((personal) => {
      if (personal.nombre === personalSelect) {
        personal.password = newPassword;
      }
      return personal;
    });
    updateListPersonal(newData);
    window.localStorage.setItem("listPersonal", JSON.stringify(newData));
    onClose();
    setPersonalSelect("");
    setVerModificarPassword(false);
            setVerDesactivarUsuario(false);
    
  };
  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };
  return (
    <div className="overlay_modal__modificar-personal">
      <div className="modalContainer1">
        <h1>Seleccione el Usuario</h1>
        <CustomSelect
          name="Personal"
          arrayOptionsSelect={nombresPersonal}
          onChange={(e) => {
            handleCustomSelect(e, setPersonalSelect);
          }}
          value={personalSelect}
        />
        <h2>
          Estado del Usuario :{" "}
          {personalSelect !== ""
            ? dataPersonal[0]?.informacionLaboral?.estado
            : "Sin Usuario Seleccionado"}
        </h2>

        {personalSelect !== "" ? (
          verDesactivarUsuario ? (
            personalSelect !== "" ? (
              dataPersonal[0].informacionLaboral?.estado === "Activo" ? (
                <CustomButton content="Desactivar" onClick={inactivarUsuario} />
              ) : (
                <CustomButton content="Activar" onClick={activarUsuario} />
              )
            ) : null
          ) : (
            <CustomButton
              content=" ¿Desactivar Usuario?"
              onClick={() => setVerDesactivarUsuario(true)}
            />
          )
        ) : null}
        {personalSelect !== "" ? (
          verModificarPassowrd ? (
            personalSelect !== "" ? (
              <div className="modificar_pass">
                <label htmlFor=""> Modificar Contraseña : </label>
                <div className="password__container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="new_password"
                    name="newpassword"
                    placeholder="nueva contraseña"
                    id=""
                    value={newPassword}
                    onChange={handleChange}
                  />
                  <p
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </p>
                </div>
                <button
                  onClick={() => {
                    modificarPassword();
                  }}
                >
                  Cambiar Contraseña
                </button>
              </div>
            ) : null
          ) : (
            <CustomButton
              content="¿Modificar Contraseña?"
              onClick={() => setVerModificarPassword(true)}
            />
          )
        ) : (
          "Seleccione un Usuario"
        )}

        <CustomButton content="Cerrar" onClick={()=>{
            onClose();
            setPersonalSelect("");
            setVerModificarPassword(false);
            setVerDesactivarUsuario(false);
        }} />
      </div>
    </div>
  );
};

export default Modal;
