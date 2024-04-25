const loadImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const generateResponse = (
  detectionFeatures: string[],
  indicadores: string[]
): { coincidencias: string[]; maltrato: string } => {
  const set = new Set(detectionFeatures);
  const coincidencias = indicadores.filter((element) => set.has(element));
  const isMaltrato = coincidencias.length >= 2;
  return { coincidencias: coincidencias, maltrato: isMaltrato ? "Sí" : "No" };
};

export { loadImageBase64, generateResponse };
