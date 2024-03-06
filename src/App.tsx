import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Logout } from "./views/exports"
import {
  AdministrarPersonal,
  AdministrarPacientes,
  NuevoCaso,
  Casos,
  PrivateRoute,
  PublicRoute,
} from "./components/exports"

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
