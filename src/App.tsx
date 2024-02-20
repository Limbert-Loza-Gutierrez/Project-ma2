import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login/Login";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import Logout from "./views/Logout/Logout";
import AdministrarPersonal from "./components/AdministrarPersonal/AdministrarPersonal";
import AdministrarPacientes from "./components/AdministrarPacientes/AdministrarPacientes";
import NuevoCaso from "./components/NuevoCaso/NuevoCaso";
import Casos from "./components/Casos/Casos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [

      {
        index: true,
        element: <h1></h1>,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/administrar-pacientes",
        element: <AdministrarPacientes />,
      },
      {
        path: "/administrar-personal",
        element: <AdministrarPersonal />,
      },
      {
        path: "/nuevo-caso",
        element: <NuevoCaso />,
      },
      {
        path: "/casos",
        element: <Casos />,
      }
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <h1>Public</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
