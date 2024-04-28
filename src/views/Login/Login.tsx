// import "./Login.styles.css";
// import CustomInput from "../../components/customs/CustomInput/CustomInput";
// import CustomButton from "../../components/customs/CustomButton/CustomButton";
// import { useState } from "react";
// import { appFirebase } from "../../config/firebase.tsx";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth(appFirebase);

// const Login = () => {
//   const [loginDate, setLoginDate] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const correo = e.target.email.value;
//     const contraseña = e.target.password.value;
//     await signInWithEmailAndPassword(auth, correo, contraseña);
//   };

//   const handleInputChange = (e) => {
//     setLoginDate({
//       ...loginDate,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <main className="container-without_sidebar">
//       <img className="logo" src="/public/image/logo.jpg" alt="" />

//       <form action="" onSubmit={handleSubmit} className="login-container">
//         <h1 className="login-title">INICIO DE SESIÓN</h1>
//         <CustomInput
//           label="Correo"
//           type="email"
//           placeholder="Correo"
//           value={loginDate.email}
//           onchange={handleInputChange}
//           name="email"
//           id="email"
//         />
//         <CustomInput
//           label="Contraseña"
//           type="password"
//           placeholder="Contraseña"
//           value={loginDate.password}
//           onchange={handleInputChange}
//           name="password"
//           id="password"
//         />
//         <CustomButton type="submit" content="Iniciar Sesión" />
//       </form>
//     </main>
//   );
// };

// export default Login;
import "./Login.styles.css";
import CustomInput from "../../components/customs/CustomInput/CustomInput";
import CustomButton from "../../components/customs/CustomButton/CustomButton";
import { useState } from "react";
import { appFirebase } from "../../config/firebase.tsx";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const Login = () => {
  const [loginDate, setLoginDate] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, correo, contraseña);
    } catch (error) {
      alert("Correo o contraseña incorrectos"); // Mostrar alerta
    }
  };

  const handleInputChange = (e) => {
    setLoginDate({
      ...loginDate,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="container-without_sidebar">
      <img className="logo" src="/public/image/logo.jpg" alt="" />

      <form action="" onSubmit={handleSubmit} className="login-container">
        <h1 className="login-title">INICIO DE SESIÓN</h1>
        <CustomInput
          label="Correo"
          type="email"
          placeholder="Correo"
          value={loginDate.email}
          onchange={handleInputChange}
          name="email"
          id="email"
        />
        <CustomInput
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          value={loginDate.password}
          onchange={handleInputChange}
          name="password"
          id="password"
        />
        <CustomButton type="submit" content="Iniciar Sesión" />
      </form>
    </main>
  );
};

export default Login;

