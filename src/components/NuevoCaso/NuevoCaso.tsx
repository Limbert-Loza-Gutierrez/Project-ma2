import CustomInput from "../customs/CustomInput/CustomInput"
import CustomButton from "../customs/CustomButton/CustomButton"
import CustomSelect from "../customs/CustomSelect/CustomSelect"
import { useState, useContext } from "react"
import UsersContext from "../../context/UsersContext"
import "./NuevoCaso.styles.css"
import { useEffect } from "react"
import axios from "axios"
import { loadImageBase64 } from "../../services/ia_detection"
import { generateResponse } from "../../services/ia_detection"



const NuevoCaso = () => {
    const { updateListPacientes } = useContext(UsersContext)
    const pacientesLocalStorage = JSON.parse(window.localStorage.getItem("listPacientes") as string);
    console.log(pacientesLocalStorage);
    const [imageUrl, setImageUrl] = useState("");
    const [selectTagValue, setSelectTagValue] = useState("LP")
    const [fileData, setFileData] = useState(null);
    const [detectionResults, setDetectionResults] = useState(null);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const handleSelectTagChange = (e) => {
        setSelectTagValue(e.target.value)
    }

    const [infPaciente, setInfPaciente] = useState({
        nombre: "",
        documento: "",
        expedicion: "",
        sexo: "",
        edad: "",
        fechaDiagnostico: "",
        imgDiagnostData: "",
        diagnostico: ""

    })

   
    const MALTRATO_INDICATORS = {
        "Persona perfil hacia el frente": {
          "agachada": true,
          "expresion_triste": true,
        },
        "Paraguas hacia la derecha": {
          "inclinado": true,
          "posicion_incorrecta": true,
        },
        "Lluvia torrencial": {
          "intensidad": "fuerte",
          "duracion": "prolongada",
        },
      };
    const handleImageUpload = (file) => {
    
        setFileData(file); // Guardamos el archivo en el estado
      
        loadImageBase64(file) // Pasamos el archivo a loadImageBase64
          .then((imageData) => {
            sendImageToAPI(imageData);
          })
          .catch((error) => {
            setError(error.message);
          });
      };


    

    const sendImageToAPI = (imageData) => {
        axios({
          method: "POST",
          url: "https://detect.roboflow.com/persona-bajo-la-lluvia/1",
          params: {
            api_key: "LP1YvLOtK4PbOiJ54HHL",
          },
          data: imageData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            setDetectionResults(response.data);
            setError(null); // Limpiamos cualquier error anterior
            const detectionFeatures =
              detectionResults?.predictions?.map((prediction) => prediction.class) ||
              [];
            setResponse(generateRandomResponse(detectionFeatures,MALTRATO_INDICATORS));
            
          })
          .catch((error) => {
            setError(error.message);
          });
      };

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

        handleImageUpload(file)

    };
    useEffect(() => {
        // Inicializamos el estado
        setError(null);
        setDetectionResults(null);
        setResponse(null);
      }, [fileData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        response?.maltratoDetected ? infPaciente.diagnostico="Sí" :  infPaciente.diagnostico="No"
        // infPaciente.imgDiagnostData=imageUrl
        const newPacientes = [...pacientesLocalStorage, infPaciente]
        updateListPacientes(newPacientes);

    }
    console.log(infPaciente)
    const handleChange = (e) => {
        setInfPaciente({
            ...infPaciente,
            [e.target.name]: e.target.value,
            expedicion: selectTagValue,
            

        })
       

    }
      
    return (
        <main className="window-content-nc">
            <h2>
                Inserte la informacion del paciente
            </h2>
            <form className="for" action="" id="form-nuevo-caso" onSubmit={handleSubmit}>
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