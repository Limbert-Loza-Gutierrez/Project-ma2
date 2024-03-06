import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";
import "./NuevoCaso.styles.css";
import { useEffect } from "react";
import axios from "axios";
import { loadImageBase64 } from "../../services/ia_detection";
import { generateResponse } from "../../services/ia_detection";
import Modal from "./Modal";

const NuevoCaso = () => {
  const { updateListPacientes } = useContext(UsersContext);
  const pacientesLocalStorage = JSON.parse(
    window.localStorage.getItem("listPacientes") as string
  );

  const [imageUrl, setImageUrl] = useState("");
  const [selectTagValue, setSelectTagValue] = useState("LP");
  const [selectGenero, setSelectGenero] = useState("seleccionDeGenero");
  const [fileData, setFileData] = useState(null);
  const [reportBase64, setReportBase64] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleSelectTagChange = (e) => {
    setSelectTagValue(e.target.value);
  };
  const infMedico = JSON.parse(
    window.localStorage.getItem("inforUser") as string
  );

  const [infPaciente, setInfPaciente] = useState({
    nombre: "",
    documento: "",
    expedicion: "",
    sexo: "",
    edad: "",
    fechaDiagnostico: "",
    // imgDiagnostData: "",
    diagnostico: "",
    nombreMedico: "",
  });


  const MALTRATO_INDICATORS = {
    "Persona perfil hacia el frente": {
      agachada: true,
      expresion_triste: true,
    },
    "Paraguas hacia la derecha": {
      inclinado: true,
      posicion_incorrecta: true,
    },
    "Lluvia torrencial": {
      intensidad: "fuerte",
      duracion: "prolongada",
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
          detectionResults?.predictions?.map(
            (prediction) => prediction.class
          ) || [];
        setResponse(
          generateRandomResponse(detectionFeatures, MALTRATO_INDICATORS)
        );
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
      console.error("Error:", error);
    };

    handleImageUpload(file);
  };
  useEffect(() => {
    // Inicializamos el estado
    setError(null);
    setDetectionResults(null);
    setResponse(null);
  }, [fileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    response?.maltratoDetected
      ? (infPaciente.diagnostico = "Sí")
      : (infPaciente.diagnostico = "No");
    // Variable para indicar si hay un campo vacío
    let hayCampoVacio = false;

    // Recorrer las propiedades de infPaciente
    for (const propiedad in infPaciente ) {
      // Obtener el valor de la propiedad
      const valor = infPaciente[propiedad];

      // Si el valor está vacío, se marca la variable y se sale del bucle
      if (!valor) {
        hayCampoVacio = true;
        break;
      }
    }

    if (hayCampoVacio) {
      alert("Debe completar todos los campos.");
      return;
    }

    setOpenModal(true);

  };

  const handleChange = (e) => {
    setInfPaciente({
      ...infPaciente,
      [e.target.name]: e.target.value,
      expedicion: selectTagValue,
      sexo: selectGenero,
      nombreMedico: infMedico.nombre,
    });
  };

  const clearForm = () => {
    setInfPaciente({
      nombre: "",
      documento: "",
      expedicion: "",
      sexo: "",
      edad: "",
      fechaDiagnostico: "",
      // imgDiagnostData: "",
      diagnostico: "",
      nombreMedico: "",
    });
  };
  const updateReportBase64 = (newValue) => {
    setReportBase64((prevState) => {
      return newValue;
    });
  };

  
  return (
    <main className="window-content-nc">
      <h2>Inserte la informacion del paciente</h2>
      <form
        className="for"
        action=""
        id="form-nuevo-caso"
        onSubmit={handleSubmit}
      >
        <CustomInput
          name="nombre"
          label="Nombre del paciente"
          type="text"
          placeholder="Nombre del paciente"
          required
          onChange={handleChange}
          value={infPaciente.nombre}
        />
        <div className="ci-expedicion">
          <CustomInput
            name="documento"
            label="Numero de documento"
            type="number"
            placeholder="Numero de documento"
            required
            onChange={handleChange}
            value={infPaciente.documento}
          />

          <CustomSelect
            name="extension"
            arrayOptionsSelect={[
              "LP",
              "CBBA",
              "SC",
              "BN",
              "PT",
              "OR",
              "CH",
              "TJ",
              "PA",
              "BE",
              "PD",
            ]}
            onChange={handleSelectTagChange}
            value={selectTagValue}
          />
        </div>

        <CustomSelect
          style={{
            width: "200px",
          }}
          name="genero"
          arrayOptionsSelect={["Masculino", "Femenino"]}
          onChange={(e) => {
            setSelectGenero(e.target.value);
          }}
          value={selectGenero}
        />

        <CustomInput
          name="edad"
          label="Edad"
          type="number"
          placeholder="Edad"
          value={infPaciente.edad}
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
          value={new Date().toISOString().split("T")[0]}
        />
        <CustomInput
          label="Imagen para Diagnostico"
          type="file"
          placeholder="Imagen para Diagnostico"
          onChange={handleChangeFile}
          required
        />
      </form>
      <CustomButton content="Realizar Diagnosticos" onClick={handleSubmit} />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        guardar={() => {
          setOpenModal(false);
          response?.maltratoDetected
            ? (infPaciente.diagnostico = "Sí")
            : (infPaciente.diagnostico = "No");

          // infPaciente.imgDiagnostData=imageUrl
          console.log("reporte" ,reportBase64);
          infPaciente.reporte = reportBase64;
          const newPacientes = [...pacientesLocalStorage, infPaciente];
          updateListPacientes(newPacientes);
          clearForm();
        }}
        informacionPaciente={infPaciente}
        updateReportBase64={updateReportBase64}      />
    </main>
  );
};

export default NuevoCaso;
