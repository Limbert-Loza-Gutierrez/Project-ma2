import { useState, createContext, FC, ReactNode, useEffect } from "react";
import listUser from "../data/listUsers";

const UsersContext = createContext(null);

const UsersContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [pacientes, setPacientes] = useState(
        () => {
            window.localStorage.getItem("listPacientes")
        })
    const [personal, setPersonal] = useState(() => window.localStorage.getItem("listPersonal"))


    const updateListPacientes = (list) => {
        window.localStorage.setItem("listPacientes", JSON.stringify(list));
        setPacientes(list);
    }
    const updateListPersonal = (list) => {
        window.localStorage.setItem("listPersonal", JSON.stringify(list));
        setPersonal(list);
    }
    

    const value = {
        personal,
        updateListPersonal,
        pacientes,
        updateListPacientes
    };
    console.log("Personal", personal);

    return <UsersContext.Provider value={value}

    >{children}</UsersContext.Provider>;
};

export { UsersContextProvider };
export default UsersContext;