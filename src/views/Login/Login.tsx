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
      updateListPacientes(listUsers.pacientes);
      updateListPersonal(listUsers.personal);
    } else {
      alert("Usuario incorrecto");
    }
  };

  return (
    <main className='container-without_sidebar'>
    
    <img className='logo' src="https://www.policia.bo/wp-content/uploads/2023/06/logo-2023-2.png"/>
    
      <form action='' onSubmit={handleSubmit} className='login-container'>
      
        <h1 className='login-title'>Iniciar Sesion</h1>

        {
          //   <label htmlFor=''>Soy paciente</label>
          // <input
          //   type='checkbox'
          //   value={isPaciente}
          //   onChange={() => setIsPaciente(!isPaciente)}
          // />
        }

        <CustomInput
          // label='Username'
          type='text'
          placeholder='Usuario'
          value={loginDate.username}
          onChange={handleInputChange}
          name='username'
        />
        <CustomInput
          type='password'
          placeholder='Contraseña'
          value={loginDate.password}
          onChange={handleInputChange}
          name='password'
        />
        <CustomButton type='submit' content='Iniciar Sesion' />
      </form>
    </main>
  );
};

export default Login;
