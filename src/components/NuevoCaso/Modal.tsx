import { useState, useEffect } from "react";
import CustomButton from "../customs/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../../../public/image/logo.jpg";
import logo24 from "../../../public/image/logo24.webp";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Modal = ({
  open,
  onClose,
  informacionPaciente,
  guardar,
  caracteristicas,
  processedImageBase64,
}) => {
  if (!open) return null;

  const [diagnosticoPsicologo, setDiagnosticoPsicologo] = useState("");

  const generatePDF = async () => {
    const diagnosticoPsicologo = document?.getElementById(
      "diagnosticoPsicologo"
    ).value;
    const diagnosticoSelectElement =
      document.querySelector(".diagnosticoSelect");

    try {
      const pdf = new jsPDF();
      const docWidth = pdf.internal.pageSize.getWidth();
      const docHeight = pdf.internal.pageSize.getHeight();

      // *Encabezado*

      pdf.setFontSize(16);
      pdf.setFont("Montserrat-Bold");

      // pdf.text("SISTEMA DE APOYO PARA PSICÓLOGOS", docWidth / 2, 50, { align: "center" });
      pdf.line(0, 60, docWidth, 60);

      // *Logotipo e imagen del paciente*

      pdf.addImage(logo, "PNG", 5, 15, 30, 30);
      pdf.addImage(logo24, "PNG", 172, 15, 30, 30);

      pdf.addImage(informacionPaciente.imagen, "PNG", 15, 180, 70, 70);
      pdf.addImage(processedImageBase64, "PNG", 100, 180, 70, 70);

      //si el objeto no esta vacio que imprima
      // caracteristicas es un objeto que contiene las caracteristicas detectadas {coincidencias:[],isMaltrato:rtue}
      if (caracteristicas.isMaltrato) {
        // pdf.text("Se detecto indicios de Maltrato Psicologico", 10, 200);

        // pdf.text(caracteristicas.coincidencias.join("\n"), 60, 270);
        pdf.text(caracteristicas.coincidencias.join(), 10, 270);
      } else {
        pdf.text(
          "No se detecto indicios de Maltrato Psicologico - Ninguna coincidencia ",
          10,
          250
        );
      }

      // *Información del paciente*

      pdf.setFontSize(16);
      pdf.setFont("Montserrat-Bold", "normal", "bold");
      pdf.text("Paciente:", 10, 80);
      pdf.text("Edad:", 10, 90);
      pdf.text("Fecha:", 10, 100);
      pdf.text("SISTEMA DE APOYO PARA PSICÓLOGOS", docWidth / 2, 20, {
        align: "center",
      });
      pdf.text("DIRECCIÓN DE IGUALDAD DE OPORTUNIDADES", docWidth / 2, 30, {
        align: "center",
      });
      pdf.text("INFORME PSICOLÓGICO", docWidth / 2, 50, { align: "center" });
      pdf.text(
        `PSICÓLOGO: ${informacionPaciente.nombreMedico}`,
        docWidth / 2,
        40,
        { align: "center" }
      );
      pdf.text("Diagnóstico del sistema:", 10, 160);
      pdf.text("Diagnóstico del psicólogo:", 10, 110);
      pdf.text("Características detectadas", 10, 260);

      pdf.setFont("Montserrat-Bold", "italic", "normal");
      pdf.text(informacionPaciente.nombre, 50, 80);
      pdf.text(informacionPaciente.edad, 50, 90);
      pdf.text(informacionPaciente.fechaDiagnostico, 50, 100);

      pdf.line(0, 150, docWidth, 150);

      pdf.setFontSize(16);

      // pdf.text(informacionPaciente.diagnostico, 80, 180);

      const ds = pdf.splitTextToSize(diagnosticoPsicologo, docWidth - 50);
      pdf.text(ds, 10, 120);

      // *¿Está de acuerdo con el diagnóstico?*

      let da = "";
      if (informacionPaciente.diagnostico === "Sí") {
        da = "Sí se detectaron indicios de maltrato psicológico";
      } else if (informacionPaciente.diagnostico === "No") {
        da = "No se detectaron indicios de maltrato psicológico";
      } else {
        da = "No especificado";
      }
      // pdf.text(`¿Está de acuerdo con el diagnóstico?: `, 10, 120);
      pdf.text(da, 10, 170);

      // *Pie de página*

      pdf.line(0, docHeight - 20, docWidth, docHeight - 20);
      pdf.setFontSize(10);

      pdf.text(
        `Página ${pdf.internal.getNumberOfPages()}`,
        docWidth - 20,
        docHeight - 10,
        { align: "right" }
      );

      const base64Data = pdf.output("datauristring");
      

      const totalLength = base64Data.length;
      const partLength = Math.floor(totalLength / 4);

      const pdf1 = base64Data.substring(0, partLength);
      const pdf2 = base64Data.substring(partLength, partLength * 2);
      const pdf3 = base64Data.substring(partLength * 2, partLength * 3);
      const pdf4 = base64Data.substring(partLength * 3);

      const nuevoInforme1 = {
        pdf: pdf1,
        idDoc: informacionPaciente.idDoc,
        documento: informacionPaciente.documento,
        nombre: informacionPaciente.nombre,
      };
      const nuevoInforme2 = {
        pdf: pdf2,
        idDoc: informacionPaciente.idDoc,
        documento: informacionPaciente.documento,
        nombre: informacionPaciente.nombre,
      };
      const nuevoInforme3 = {
        pdf: pdf3,
        idDoc: informacionPaciente.idDoc,
        documento: informacionPaciente.documento,
        nombre: informacionPaciente.nombre,
      };
      const nuevoInforme4 = {
        pdf: pdf4,
        idDoc: informacionPaciente.idDoc,
        documento: informacionPaciente.documento,
        nombre: informacionPaciente.nombre,
      };
      const docRef = collection(db, "informes");
      const docRef2 = collection(db, "informes2");
      const docRef3 = collection(db, "informes3");
      const docRef4 = collection(db, "informes4");
      addDoc(docRef, nuevoInforme1).then(
        (docRef) => {
          console.log("Document written with ID: ", docRef.id);
        },
        (error) => {
          console.error("Error adding document: ", error);
        }
      );
      addDoc(docRef2, nuevoInforme2).then(
        (docRef) => {
          console.log("Document written with ID: ", docRef.id);
        },
        (error) => {
          console.error("Error adding document: ", error);
        }
      );
      addDoc(docRef3, nuevoInforme3).then(
        (docRef) => {
          console.log("Document written with ID: ", docRef.id);
        },
        (error) => {
          console.error("Error adding document: ", error);
        }
      );
      addDoc(docRef4, nuevoInforme4).then(
        (docRef) => {
          console.log("Document written with ID: ", docRef.id);
        },
        (error) => {
          console.error("Error adding document: ", error);
        }
      );

      onClose();
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  useEffect(() => {
    if (open) {
      const diagnosticoSelectElement =
        document.querySelector(".diagnosticoSelect");
      if (diagnosticoSelectElement) {
        console.log(
          "Elemento Seleccionado de Diagnóstico Encontrado:",
          diagnosticoSelectElement.value
        );
      } else {
        console.error("Elemento Seleccionado de Diagnóstico No Encontrado");
      }
    }
  }, [open]);

  return (
    <div className="modalContainernc" id="modalContainer">
      <h1>
        {informacionPaciente.diagnostico === "Sí"
          ? "Se detecto indicios de Maltrato Psicológico"
          : "No se detecto indicios de Maltrato Psicológico"}
      </h1>
      <label htmlFor="diagnosticoSelect">
        ¿Está de acuerdo con el diagnóstico?
      </label>
      <select
        className="diagnosticoSelect"
        name="diagnosticoSelect"
        id="diagnosticoSelect"
      >
        <option value="si">Si</option>
        <option value="no">No</option>
      </select>
      <label htmlFor="diagnosticoPsicologo">Diagnostico del Psicólogo</label>
      <textarea
        className="diagnosticoPsicologo"
        name="diagnosticoPsicologo"
        id="diagnosticoPsicologo"
        cols="30"
        rows="10"
        value={diagnosticoPsicologo}
        style={{
          outline: "none",
          border: "none",
          color: "#666",
          display: "",
          width: "95%",
          background: "#e6e6e6",
          fontFamily: "Montserrat-Bold",
          borderRadius: "20px",
          minHeight: "150px",
          padding: "10px",
        }}
        onChange={(e) => setDiagnosticoPsicologo(e.target.value)}
      ></textarea>

      <div className="imprimird">
        <Link to="/casos">
          <CustomButton
            content="Guardar"
            onClick={() => {
              guardar();
              generatePDF();
            }}
          />
        </Link>
        <CustomButton content="Cancelar" onClick={onClose} />
      </div>
    </div>
  );
};

export default Modal;
