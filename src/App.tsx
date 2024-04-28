import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Logout,Home} from "./views/exports"
import {
  AdministrarPersonal,
  AdministrarPacientes,
  NuevoCaso,
  Casos,
  PrivateRoute,
  PublicRoute,
  Reportes,
} from "./components/exports"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [

      {
        index: true,
        element: <Home/>
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
      },
      {
        path: "/reportes",
        element: <Reportes/>,
      },
      
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
