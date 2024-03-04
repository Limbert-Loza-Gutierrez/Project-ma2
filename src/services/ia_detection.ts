export const loadImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Función para generar una respuesta aleatoria
export function generateResponse(detectedFeatures, MALTRATO_INDICATORS) {
  
  const maltratoDetected= detectedFeatures.filter((elemento) => MALTRATO_INDICATORS.includes(elemento));
console.log(maltratoDetected)
  return maltratoDetected;

}

