import "./Login.styles.css";
import CustomInput from "../../components/customs/CustomInput/CustomInput";
import CustomButton from "../../components/customs/CustomButton/CustomButton";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import UsersContext from "../../context/UsersContext";
import listUsers from "../../data/listUsers.ts";
const Login = () => {
  const { Login, updateUserInfo } = useContext(AuthContext);
  const { updateListPacientes, updateListPersonal } = useContext(UsersContext);
  // const [isPaciente, setIsPaciente] = useState(false);
  const [loginDate, setLoginDate] = useState({
    username: "",
    password: "",
  });
  //user_list toma el valor de lissuser.persona si es que no exist eun item llamdo listPersonal en el localstorage
  const user_list = JSON.parse(window.localStorage.getItem("listPersonal")) || listUsers.personal;
  // const user_list = [];
  // if (isPaciente) {
  //   user_list = listUsers.pacientes;
  // } else {
  //   user_list = listUsers.personal;
  // }
  const user = user_list.find(
    (user) =>
      user.nombreUsuario === loginDate.username &&
      user.password === loginDate.password
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser();
  };
  const handleInputChange = (e) => {
    setLoginDate({
      ...loginDate,
      [e.target.name]: e.target.value,
    });
  };
  const verifyUser = () => {
    if (user) {
      Login();
      updateUserInfo(user);
      // si no hay items en el localstorage con el nombre listPacientes
      // se carga la lista de pacientes desde el archivo listUsers.ts
      if (!window.localStorage.getItem("listPacientes")) {
        updateListPacientes(listUsers.pacientes);
        updateListPersonal(listUsers.personal);
      }
    } else {
      alert("Usuario incorrecto");
    }
  };
  

  return (
    <main className='container-without_sidebar'>
          <img className="logo" src="/public/image/logo2.jpg" alt="" />
        
        <form action='' onSubmit={handleSubmit} className='login-container' >
          <h1 className='login-title'>INICIO DE SESIÓN</h1>

          {
          //   <label htmlFor=''>Soy paciente</label>
          // <input
          //   type='checkbox'
          //   value={isPaciente}
          //   onChange={() => setIsPaciente(!isPaciente)}
          // />
          }
          
          <CustomInput
            label='Nombre de Usuario'
            type='text'
            placeholder='Usuario'
            value={loginDate.username}
            onChange={handleInputChange}
            name='username'
          />
          <CustomInput
            label='Contraseña'
            type='password'
            placeholder='Contraseña'
            value={loginDate.password}
            onChange={handleInputChange}
            name='password'
          />
          <CustomButton type='submit' content='Iniciar Sesión' />
        </form>
       

    </main>
  );
};

export default Login;
