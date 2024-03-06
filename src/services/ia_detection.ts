const loadImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Función para generar una respuesta aleatoria
function generateResponse(array1, array2) {
  let coincidencias = [];
  let isMaltrato = false;

  if (array1.length === 0 || array2.length === 0 || array1.length <= 2 || array2.length <= 2) {
    isMaltrato = false;
  }

  for (const element of array1) {
    if (array2.includes(element)) {
      coincidencias.push(element);
    }
  }

  if (coincidencias.length >= 2) {
    isMaltrato = true;
    return { coincidencias, isMaltrato };
  }
  else {
    return {};
  }

}

export {
  loadImageBase64,
  generateResponse
}

