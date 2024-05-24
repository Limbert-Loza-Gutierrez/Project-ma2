import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { appFirebase } from "../../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth(appFirebase);
const CustomSidebarOptions = ({ data_user, opciones }) => {
  const changePassword = async () => {
    try {
      // await sendPasswordResetEmail(auth, data_user.correoInstitucional);
      await sendPasswordResetEmail(auth, "prueba");
      alert("Se ha enviado un correo para cambiar la contraseña");
    } catch (error) {
      alert("Ha ocurrido un error al enviar el correo");
    }
  };

  return (
    <aside className="sidebar">
      <div className="perfil-usuario">
        <img src={data_user.imgPerfil} alt="" className="foto-usuario" />
        {data_user.nivelJerarquico === "Super Administrador" ? (
          <h3>Administrador</h3>
        ) : (
          <div className="text-perfil nome-usuario">
            {data_user.nombre}
            <br />
            Psicólogo
          </div>
        )}
      </div>
      <div className="opciones-sidebar">
        {opciones.map((opcion, index) => {
          return (
            <Link to={opcion.to} key={index}>
              <div className="opcion-sidebar">
                <div className="text-opcion">{opcion.text}</div>
              </div>
            </Link>
          );
        })}
        <button onClick={changePassword}>Cambiar Contraseña</button>
      </div>
    </aside>
  );
};

CustomSidebarOptions.propTypes = {
  data_user: PropTypes.object,
  opciones: PropTypes.array,
};

export default CustomSidebarOptions;
