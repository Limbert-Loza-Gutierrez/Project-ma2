import { google } from "googleapis";

const CLIENT_ID =
  "336098988398-5k1796bkf607uf4625fpmnhucs951a0q.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04wtu8FPNHEWDCgYIARAAGAQSNwF-L9IrgUcO9SpSzf-Qg8ZtsIgZsPx4Paq9GTaxtlU4YHpt4J7lhgtNpAbxB1kRKDLwgplpg00";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadFile = async (base64Data, nombreArchivo) => {
  console.log("Subiendo archivo a Google Drive...");
  try {
    const response = await drive.files.create({
      requestBody: {
        name: nombreArchivo,
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: base64Data,
      },
    });
    console.log("Archivo subido:", response.data);
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;
  }
};

export { uploadFile };
