import { GrUserAdd, GrUserSettings, GrLogout } from "react-icons/gr";

const opcionesAdmin = [
  {
    to: "/administrar-pacientes",
    icon: <GrUserAdd />,
    text: "Pacientes",
  },
  {
    to: "/administrar-personal",
    icon: <GrUserSettings />,
    text: "Personal",
  },
  {
    to: "/logout",
    icon: <GrLogout />,
    text: "Cerrar sesión",
  },
];
const opcionesPsicologo = [
  {
    to: "/nuevo-caso",
    icon: <GrUserAdd />,
    text: "Nuevo Caso",
  },
  {
    to: "/casos",
    icon: <GrUserSettings />,
    text: "Casos",
  },
  {
    to: "/logout",
    icon: <GrLogout />,
    text: "Cerrar sesión",
  },
];



export { opcionesAdmin, opcionesPsicologo };
