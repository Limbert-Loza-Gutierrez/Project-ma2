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
  const maltratoIndicators = {};
  detectedFeatures.forEach((feature) => {
    if (MALTRATO_INDICATORS.hasOwnProperty(feature)) {
      const indicatorKeys = Object.keys(MALTRATO_INDICATORS[feature]);
      const randomIndicator =
        indicatorKeys[Math.floor(Math.random() * indicatorKeys.length)];
      maltratoIndicators[feature] = randomIndicator;
    }
  });

  const maltratoDetected = Object.keys(maltratoIndicators).length > 0;

  return {
    maltratoDetected,
    maltratoIndicators,
  };
}

