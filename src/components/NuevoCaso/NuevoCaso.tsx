import CustomInput from "../customs/CustomInput/CustomInput"
import CustomButton from "../customs/CustomButton/CustomButton"
import CustomSelect from "../customs/CustomSelect/CustomSelect"
import { useState, useContext } from "react"
import UsersContext from "../../context/UsersContext"
import "./NuevoCaso.styles.css"

const NuevoCaso = () => {
    const { updateListPacientes } = useContext(UsersContext)
    const pacientesLocalStorage = JSON.parse(window.localStorage.getItem("listPacientes") as string);
    console.log(pacientesLocalStorage);
    const [imageUrl, setImageUrl] = useState("");
    const [selectTagValue, setSelectTagValue] = useState("LP")

    const handleSelectTagChange = (e) => {
        setSelectTagValue(e.target.value)
    }

    const [infPaciente, setInfPaciente] = useState({
        nombre: "",
        documento: "",
        extension: "",
        sexo: "",
        edad: "",
        fechaDiagnostico: "",
        imgDiagnostData: ""

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPacientes = [...pacientesLocalStorage, infPaciente]
        updateListPacientes(newPacientes);
    }
    const handleChange = (e) => {
        setInfPaciente({
            ...infPaciente,
            [e.target.name]: e.target.value,
            extension: selectTagValue,
            imgDiagnostData: imageUrl
        })

    }

    const handleChangeFile = (event) => {
        const file = event.target.files[0];



        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setImageUrl(reader.result);
        };

        reader.onerror = (error) => {
            console.error('Error:', error);
        };
    };
    return (
        <main className="window-content-nc">
            <h2>
                Inserte la informacion del paciente
            </h2>
            <form action="" id="form-nuevo-caso" onSubmit={handleSubmit}>
                <CustomInput
                    name="nombre"
                    label="Nombre del paciente"
                    type="text"
                    placeholder="Nombre del paciente"
                    required
                    onChange={handleChange}

                />
                <div className="ci-expedicion">
                    <CustomInput
                        name="documento"
                        label="Numero de documento"
                        type="number"
                        placeholder="Numero de documento"
                        required
                        onChange={handleChange}

                    />
                
                    <CustomSelect
                        name="extension"
                        arrayOptionsSelect={["LP", "CBBA", "SC", "BN", "PT", "OR", "CH", "TJ", "PA", "BE", "PD"]}
                        onChange={handleSelectTagChange}
                        value={selectTagValue}
                    />                    
                </div>
                <CustomInput
                    name="sexo"
                    label="Sexo"
                    type="text"
                    placeholder="Sexo"
                    required
                    onChange={handleChange}

                />
                <CustomInput
                    name="edad"
                    label="Edad"
                    type="number"
                    placeholder="Edad"
                    required
                    onChange={handleChange}

                />
                <CustomInput
                    name="fechaDiagnostico"
                    label="Fecha de diagnostico"
                    type="date"
                    placeholder="Fecha de diagnostico"
                    required
                    onChange={handleChange}
                />
                <CustomInput
                    label="Imagen para Diagnostico"
                    type="file"
                    placeholder="Imagen para Diagnostico"
                    onChange={handleChangeFile}
                    required
                />
                {/* {imageUrl && <img src={imageUrl} alt="Imagen subida" />} */}
                <CustomButton
                    content="Realizar Diagnosticos"
                    type="submit"
                />
            </form>
        </main>
    )
}

export default NuevoCaso