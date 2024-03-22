import { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../customs/CustomButton/CustomButton";
import "./ModificarPersonal.styles.css"

function ModificarPersonal() {
  const [openModal, setOpenModal] = useState(false);
  

  return (
    
    <>
      <CustomButton
      content='Modificar Personal'
        onClick={() => setOpenModal(true)}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default ModificarPersonal;
