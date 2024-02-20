import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay '>
      <div className='modalContainer'>
        <form className='inputs-box'>
          <CustomInput
            type='text'
            placeholder='Nombre'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='text'
            placeholder='Apellido'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='email'
            placeholder='Correo'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='password'
            placeholder='Contraseña'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='password'
            placeholder='Confirmar Contraseña'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='text'
            placeholder='Rol'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='text'
            placeholder='Unidad Organizacional'
            value=''
            onChange={() => { }}
          />
          <CustomInput
            type='text'
            placeholder='Nivel Jerárquico'
            value=''
            onChange={() => { }}
          />
        </form>
        <div className='buttons-box'>
          <CustomButton content='Cancelar' onClick={onClose} />
          <CustomButton content='Guardar' onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
