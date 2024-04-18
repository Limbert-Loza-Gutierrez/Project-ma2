import { useState } from "react";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import CustomButton from "../customs/CustomButton/CustomButton";
import { useContext } from "react";
import UsersContext from "../../context/UsersContext";
import { useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  const { updateListPersonal } = useContext(UsersContext);
  const [personalSelect, setPersonalSelect] = useState("");
  const [verDesactivarUsuario, setVerDesactivarUsuario] = useState(false);
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "personal"), (snapshot) => {
      const updatedPersonal = [];
      snapshot.forEach((doc) => {
        updatedPersonal.push({ ...doc.data(), id: doc.id });
      });
      setPersonal(updatedPersonal);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setPersonalSelect(e.target.value);
  };

  const extractID = (name) => {
    return personal.find((item) => item.nombre === name)?.id;
  };

  const handleDesactivarUsuario = async () => {
    const personalRef = doc(db, "personal", extractID(personalSelect));
    await updateDoc(personalRef, {
      estado: "Inactivo",
    });
    updateListPersonal(personal.find((item) => item.nombre === personalSelect));
    onClose();
  };

  const handleActivarUsuario = async () => {
    const personalRef = doc(db, "personal", extractID(personalSelect));
    await updateDoc(personalRef, {
      estado: "Activo",
    });
    updateListPersonal(personal.find((item) => item.nombre === personalSelect));
    onClose();
  };

  return (
    <div className="overlay_modal__modificar-personal">
      <div className="modalContainer1">
        <h1>Seleccione el Usuario</h1>
        <CustomSelect
          name="Personal"
          arrayOptionsSelect={personal.map((item) => item.nombre)}
          onChange={handleChange}
          value={personalSelect}
        />
        <h2>
          Estado del Usuario :{" "}
          {personalSelect !== ""
            ? personal.find((item) => item.nombre === personalSelect)?.estado
            : "Sin Usuario Seleccionado"}
        </h2>

        {personalSelect !== "" && !verDesactivarUsuario && (
          <CustomButton
            content="¿Desactivar Usuario?"
            onClick={() => setVerDesactivarUsuario(true)}
          />
        )}

        {verDesactivarUsuario && (
          <CustomButton
            content="Desactivar"
            onClick={handleDesactivarUsuario}
          />
        )}

        {verDesactivarUsuario && (
          <CustomButton content="Activar" onClick={handleActivarUsuario} />
        )}

        <CustomButton
          content="Cerrar"
          onClick={() => {
            onClose();
            setPersonalSelect("");
            setVerDesactivarUsuario(false);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
