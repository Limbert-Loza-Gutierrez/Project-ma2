import { useState } from "react";
import Modal from "./Modal";
import "./NuevoRegistro.styles.css";
import CustomButton from "../customs/CustomButton/CustomButton";

function NuevoRegistro() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className=''>
      <CustomButton
        content='Nuevo Registro'
        onClick={() => setOpenModal(true)}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

export default NuevoRegistro;
