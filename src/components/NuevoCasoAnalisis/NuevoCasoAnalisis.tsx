import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadImageBase64 } from '../../services/ia_detection';
import { generateResponse } from '../../services/ia_detection';

function ImageUploader() {
  const [fileData, setFileData] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0]; // Accedemos al archivo directamente
  setFileData(file); // Guardamos el archivo en el estado

  loadImageBase64(file) // Pasamos el archivo a loadImageBase64
    .then((imageData) => {
      sendImageToAPI(imageData);
    })
    .catch((error) => {
      setError(error.message);
    });
};
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


  useEffect(() => {
    // Inicializamos el estado
    setError(null);
    setDetectionResults(null);
    setResponse(null);
  }, [fileData]);

  

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {error && <p>Error: {error}</p>}
      {detectionResults && (
        <>
        <pre>
          {"Caracteristicas detectadas : "}
          {detectionResults.predictions.map((prediction) => prediction.class).join(', ')}
          
        </pre>
        <h1>
          {"Predicción de maltrato: "}
          {response?.maltratoDetected ? "Sí" : "No"}
        </h1></>
      )}
    </div>
  );
}

export default ImageUploader;
