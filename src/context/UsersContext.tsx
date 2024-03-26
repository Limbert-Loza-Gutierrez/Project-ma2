import { useState, createContext, FC, ReactNode } from "react";

interface UsersContextData {
    personal: any;
    updateListPersonal: (list: any) => void;
    pacientes: any;
    updateListPacientes: (list: any) => void;
}


// const UsersContext = createContext(null);
const UsersContext = createContext<UsersContextData>({
    personal: null,
    updateListPersonal: () => { },
    pacientes: null,
    updateListPacientes: () => { }
});



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

    return <UsersContext.Provider value={value}

    >{children}</UsersContext.Provider>;
};

export { UsersContextProvider };
export default UsersContext;