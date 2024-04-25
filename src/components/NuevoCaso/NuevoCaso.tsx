import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { expedicion, genero, edad } from "../../data/selectData";
import { useState } from "react";
import "./NuevoCaso.styles.css";
import { useEffect } from "react";
import axios from "axios";
import { loadImageBase64, generateResponse } from "../../services/ia_detection";
import Modal from "./Modal";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, appFirebase } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);

interface PersonalData {
  correoInstitucional: string;
  documento: string;
  especialidad: string;
  estado: string;
  expedicion: string;
  imgPerfil: string;
  nivelJerarquico: string;
  nombre: string;
  nombreUsuario: string;
  password: string;
  tipoLaboral: string;
}

const NuevoCaso = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectTagValue, setSelectTagValue] = useState("");
  const [selectGenero, setSelectGenero] = useState("");
  const [selectEdad, setSelectEdad] = useState("");
  const [fileData, setFileData] = useState(null);
  const [reportBase64, setReportBase64] = useState(null);
  const [detectionResults, setDetectionResults] = useState<{ coincidencias: string[]; maltrato: string; } | null>(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState<PersonalData | null>(null);
  const [personal, setPersonal] = useState<PersonalData[]>([]);
  const [infPaciente, setInfPaciente] = useState<{
    idDoc: string;
    nombre: string;
    documento: string;
    expedicion: string;
    sexo: string;
    edad: string;
    fechaDiagnostico: string;
    nombreMedico: string;
    diagnostico: string;
    imagen: string;
  }>({
    idDoc: "",
    nombre: "",
    documento: "",
    expedicion: "",
    sexo: "",
    edad: "",
    fechaDiagnostico: "",
    nombreMedico: "",
    diagnostico: "",
    imagen: "",
  });

  useEffect(() => {
    const getData = collection(db, "personal");
    getDocs(getData).then((querySnapshot) => {
      const data: PersonalData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as PersonalData);
      });
      setPersonal(data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentPersonal: PersonalData | undefined = personal.find(
        (p: PersonalData) => p.correoInstitucional === user?.email
      );

      if (currentPersonal) {
        setCurrentUser(currentPersonal);
        setInfPaciente((prevInfPaciente) => ({
          ...prevInfPaciente,
          nombreMedico: currentPersonal.nombre,
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [personal]);

  const handleSubmitProcessedImage = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
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

  // const sendImageToAPI = (imageData) => {
  //   axios({
  //     method: "POST",
  //     url: "https://detect.roboflow.com/persona-bajo-la-lluvia/1",
  //     params: {
  //       api_key: "EAW01eDHAuDdqLm8W0W9",
  //     },
  //     data: imageData,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then(function (response) {
  //       let detectionFeatures =
  //         response.data?.predictions?.map(
  //           (prediction: { class: string }) => prediction.class
  //         ) || [];
  //         console.log(detectionFeatures)
  //       if(detectionFeatures.length > 0){
  //         const repuesta = generateResponse(detectionFeatures, indicadores);
  //         setDetectionResults(repuesta);
  //       }else{
  //         setDetectionResults(null);
  //       }
        
  //     })
  //     .catch(function (error) {
  //       console.error(error.message);
  //     });
  // };


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
          response.data?.predictions?.map(
            (prediction: { class: string }) => prediction.class
          ) || [];
        if(detectionFeatures.length > 0){
          let respuesta = generateResponse(detectionFeatures, indicadores);
          setDetectionResults(respuesta);
        } else {
          setDetectionResults(null);
        }
        
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
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
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
    // detectionResults?.isMaltrato
    //   ? (infPaciente.diagnostico = "Sí")
    //   : (infPaciente.diagnostico = "No");
    // if(detectionResults?.isMaltrato !== undefined || detectionResults?.isMaltrato !== null){
    //   if(detectionResults?.isMaltrato){
    //     infPaciente.diagnostico = "Sí";
    //   }else{
    //     infPaciente.diagnostico = "No";
    //   }
    // }

    infPaciente.diagnostico = "Sí";
    infPaciente.imagen = imageUrl;
    infPaciente.idDoc = Math.floor(Math.random() * 1000).toString();
    let hayCampoVacio = false;

    for (const propiedad in infPaciente) {
      if (Object.prototype.hasOwnProperty.call(infPaciente, propiedad)) {
        const valor = infPaciente[propiedad as keyof typeof infPaciente];

        if (!valor) {
          hayCampoVacio = true;
          break;
        }
      }
    }

    if (hayCampoVacio) {
      alert("Debe completar todos los campos.");
      return;
    }

    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfPaciente((prevInfPaciente) => ({
      ...prevInfPaciente,
      [name]: value,
      fechaDiagnostico: new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-"),
    }));

    // Actualizar los campos de selección por separado
    if (name === "expedicion") {
      setSelectTagValue(value);
    } else if (name === "sexo") {
      setSelectGenero(value);
    } else if (name === "edad") {
      setSelectEdad(value);
    }
  };

  const clearForm = () => {
    setInfPaciente({
      idDoc: "", 
      nombre: "",
      documento: "",
      expedicion: "",
      sexo: "",
      edad: "",
      fechaDiagnostico: "",
      diagnostico: "",
      nombreMedico: "",
      imagen: "", 
    });
  };
  const updateReportBase64 = (newValue) => {
    setReportBase64(() => {
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
            label="Nombre"
            type="text"
            placeholder="Nombre"
            onchange={handleChange}
            value={infPaciente.nombre}
          />
        </div>
        <div className="ci-expedicion1 contain-input option-form__nuevocaso">
          <CustomInput
            name="documento"
            label="Carnet de identidad"
            type="number"
            placeholder="Carnet de Identidad"
            onchange={handleChange}
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
            onchange={handleChangeFile}
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
          const newPacientes = { ...infPaciente };
          if ("" in newPacientes) {
            delete newPacientes[""];
          }
          console.log(newPacientes);
          const docRef = collection(db, "paciente");
          addDoc(docRef, newPacientes).then(
            (docRef) => {
              console.log("Document written with ID: ", docRef.id);
            },
            (error) => {
              console.error("Error adding document: ", error);
            }
          );
          clearForm();
        }}
        informacionPaciente={infPaciente}
        processedImageBase64={processedImage}
        detectionResults={detectionResults}
      />
    </main>
  );
};

export default NuevoCaso;
