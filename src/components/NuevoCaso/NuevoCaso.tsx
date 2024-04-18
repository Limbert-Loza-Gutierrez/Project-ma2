import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { expedicion, genero, edad } from "../../data/selectData";
import { useState, useContext } from "react";
import UsersContext from "../../context/UsersContext";
import "./NuevoCaso.styles.css";
import { useEffect } from "react";
import axios from "axios";
import { loadImageBase64, generateResponse } from "../../services/ia_detection";
import Modal from "./Modal";
import { number } from "prop-types";

const NuevoCaso = () => {
  const { updateListPacientes } = useContext(UsersContext);
  const pacientesLocalStorage = JSON.parse(
    window.localStorage.getItem("listPacientes") as string
  );

  const [imageUrl, setImageUrl] = useState("");
  const [selectTagValue, setSelectTagValue] = useState("");
  const [selectGenero, setSelectGenero] = useState("");
  const [selectEdad, setSelectEdad] = useState("");
  const [fileData, setFileData] = useState(null);
  const [reportBase64, setReportBase64] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

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
    nombreMedico: "",
    id: number,
  });

  const handleSubmitProcessedImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      const processedImageResponse = await axios.get(
        "http://localhost:8000/processed_image/"
      );

   
      setProcessedImage(processedImageResponse.data.image);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  useEffect(() => {
    const fetchProcessedImage = async () => {
      try {
        const processedImageResponse = await axios.get(
          "http://localhost:8000/processed_image/"
        );
        setProcessedImage(processedImageResponse.data.image);
      } catch (error) {
        console.error("Error fetching processed image:", error);
      }
    };

    fetchProcessedImage();
  }, []);

  const handleCustomSelect = (e, functionSelect) => {
    handleChange(e);
    functionSelect(e.target.value);
  };
  const indicadores = [
    "Lluvia como lágrimas",
    "Lluvia torrencial",
    "Nubes",
    "Rayo",
    "Margen abajo",
    "Boca abierta",
    "Paraguas cerrado",
    "Paraguas muy chico",
    "Paraguas tipo lanza",
    "Dibujo pequeño",
    "Margen izquierdo",
  ];
  const handleImageUpload = (file) => {
    setFileData(file);

    loadImageBase64(file)
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
        api_key: "EAW01eDHAuDdqLm8W0W9",
      },
      data: imageData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        let detectionFeatures =
          response.data?.predictions?.map((prediction) => prediction.class) ||
          [];
        let repuesta = generateResponse(detectionFeatures, indicadores);
        setDetectionResults(repuesta);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };

  const handleChangeFile = (event) => {
    handleChange(event);
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error:", error);
    };
    setSelectedFile(file);
    handleImageUpload(file);
  };

  useEffect(() => {
    setError(null);
    setDetectionResults(null);
    setResponse(null);
  }, [fileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitProcessedImage();
    detectionResults?.isMaltrato
      ? (infPaciente.diagnostico = "Sí")
      : (infPaciente.diagnostico = "No");
    infPaciente.imagen = imageUrl;
    let hayCampoVacio = false;

    for (const propiedad in infPaciente) {
      const valor = infPaciente[propiedad];

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
      edad: selectEdad,
      nombreMedico: infMedico.nombre,
      fechaDiagnostico: new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-"),
      id: pacientesLocalStorage.length + 1,
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
      diagnostico: "",
      nombreMedico: "",
      id: number,
    });
  };

  const updateReportBase64 = (newValue) => {
    setReportBase64((prevState) => {
      return newValue;
    });
  };

  return (
    <main className="window-content-nc">
      <h2>Inserte la información del paciente</h2>
      <form
        className="for"
        action=""
        id="form-nuevo-caso"
        onSubmit={handleSubmit}
      >
        <div className="contain-input option-form__nuevocaso">
          <CustomInput
            name="nombre"
            label="Nombre del paciente"
            type="text"
            placeholder="Nombre del paciente"
            required
            onChange={handleChange}
            value={infPaciente.nombre}
          />
        </div>
        <div className="ci-expedicion1 contain-input option-form__nuevocaso">
          <CustomInput
            name="documento"
            label="Carnet de identidad"
            type="number"
            placeholder="Carnet de Identidad"
            required
            onChange={handleChange}
            value={infPaciente.documento}
          />

          <CustomSelect
            style={{
              width: "70%",

              textAlign: "center",
              borderRadius: "5px",
            }}
            name="expedicion"
            arrayOptionsSelect={expedicion}
            onChange={(e) => {
              handleCustomSelect(e, setSelectTagValue);
            }}
            value={selectTagValue}
          />
        </div>
        <div className="genero contain-select option-form__nuevocaso">
          <label className="select-label">Género</label>
          <CustomSelect
            style={{
              width: "445px",
            }}
            name="sexo"
            arrayOptionsSelect={genero}
            onChange={(e) => {
              handleCustomSelect(e, setSelectGenero);
            }}
            value={selectGenero}
          />
        </div>
        <div className="edad contain-select option-form__nuevocaso">
          <label className="select-label">Edad</label>
          <CustomSelect
            style={{
              width: "445px",
            }}
            name="edad"
            arrayOptionsSelect={edad}
            onChange={(e) => {
              handleCustomSelect(e, setSelectEdad);
            }}
            value={selectEdad}
          />
        </div>
        <div className="option-form__nuevocaso">
          <CustomInput
            name="fechaDiagnostico"
            label="Fecha de diagnóstico"
            type="text"
            placeholder="Fecha de diagnóstico"
            required
            value={new Date()
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-")}
            readOnly
          />
        </div>
        <div className="input-file">
          <CustomInput
            label="Imagen para diagnóstico"
            type="file"
            placeholder="Imagen para diagnóstico"
            onChange={handleChangeFile}
            required
          />
        </div>
      </form>
      <CustomButton content="Realizar diagnósticos" onClick={handleSubmit} />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        guardar={() => {
          setOpenModal(false);
          infPaciente.reporte = reportBase64;
          const newPacientes = [...pacientesLocalStorage, infPaciente];
          updateListPacientes(newPacientes);
          clearForm();
        }}
        informacionPaciente={infPaciente}
        updateReportBase64={updateReportBase64}
        caracteristicas={detectionResults}
        processedImageBase64={processedImage}
      />
    </main>
  );
};

export default NuevoCaso;
