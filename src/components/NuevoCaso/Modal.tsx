import React, { useState, useEffect } from "react";
import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { jsPDF } from "jspdf";

import logo from "../../../public/image/logo.jpg";

const Modal = ({
  open,
  onClose,
  informacionPaciente,
  guardar,
  updateReportBase64,
  caracteristicas
}) => {
  // const [base64PDF, setBase64PDF] = useState("");
  if (!open) return null;
  const infoMedico = JSON.parse(localStorage.getItem("infoUser")) || {};
  const [diagnosticoPsicologo, setDiagnosticoPsicologo] = useState("");

  const generatePDF = async () => {
    const diagnosticoPsicologo = document.getElementById(
      "diagnosticoPsicologo"
    ).value;
    const diagnosticoSelectElement =
      document.querySelector(".diagnosticoSelect");
    const diagnosticoSeleccionado = diagnosticoSelectElement.value;

    try {
      const pdf = new jsPDF();
      const docWidth = pdf.internal.pageSize.getWidth();
      const docHeight = pdf.internal.pageSize.getHeight();

      // *Encabezado*

      pdf.setFontSize(16);
      pdf.text("SISTEMA DE APOYO PARA PSICÓLOGOS", docWidth / 2, 20, {
        align: "center",
      });
      pdf.text("DIRECCIÓN DE IGUALDAD DE OPORTUNIDADES", docWidth / 2, 30, {
        align: "center",
      });
      pdf.text("INFORME PSICOLÓGICO", docWidth / 2, 40, { align: "center" });
      // pdf.text("SISTEMA DE APOYO PARA PSICÓLOGOS", docWidth / 2, 50, { align: "center" });
      pdf.line(0, 60, docWidth, 60);

      // *Logotipo e imagen del paciente*

      pdf.addImage(logo, "PNG", 5, 15, 30, 30);
      pdf.addImage(informacionPaciente.imagen, "PNG", 15, 200, 70, 70);
      pdf.addImage(informacionPaciente.imagen, "PNG", 100, 200, 70, 70);
      pdf.text(caracteristicas, 100, 220)

      // *Información del paciente*

      pdf.setFontSize(20);
      pdf.text("Paciente:", 10, 80);
      pdf.text(informacionPaciente.nombre, 50, 80);
      pdf.text("Edad:", 10, 90);
      pdf.text(informacionPaciente.edad, 50, 90);

      pdf.text("Fecha:", 10, 100);
      pdf.text(informacionPaciente.fechaDiagnostico, 50, 100);

      pdf.line(0, 160, docWidth, 160);

      pdf.setFontSize(16);
      pdf.text("Diagnóstico del Sistema:", 10, 180);
      pdf.text(informacionPaciente.diagnostico, 80, 180);
      pdf.text("Diagnóstico del Psicólogo:", 10, 140);
      const ds = pdf.splitTextToSize(diagnosticoPsicologo, docWidth - 50);
      pdf.text(ds, 80, 140);

      // *¿Está de acuerdo con el diagnóstico?*

      let da = "";
      if (diagnosticoSeleccionado === "si") {
        da = "Sí se detectaron indicios de maltrato psicologico";
      } else if (diagnosticoSeleccionado === "no") {
        da = "No se detectaron indicios de maltrato psicologico";
      } else {
        da = "No especificado";
      }
      pdf.text(`¿Está de acuerdo con el diagnóstico?: `, 10, 120);
      pdf.text(da, 10, 130);

      // *Pie de página*

      pdf.line(0, docHeight - 20, docWidth, docHeight - 20);
      pdf.setFontSize(10);
      pdf.text(`Elaborado por: ${informacionPaciente.nombreMedico}`, 10, docHeight - 10);
      pdf.text(
        `Página ${pdf.internal.getNumberOfPages()}`,
        docWidth - 20,
        docHeight - 10,
        { align: "right" }
      );



      const base64Data = pdf.output("datauristring");


      const informesPrevios =
        JSON.parse(localStorage.getItem("informes")) || [];
      const nuevoInforme = {
        pdf: base64Data,
        id: informacionPaciente.id,
        documento: informacionPaciente.documento,
        nombre: informacionPaciente.nombre,
      };
      informesPrevios.push(nuevoInforme);
      localStorage.setItem("informes", JSON.stringify(informesPrevios));
      console.log("Base64:", base64Data);
      updateReportBase64(base64Data);
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
        ); // Para depuración
      } else {
        console.error("Elemento Seleccionado de Diagnóstico No Encontrado");
      }
    }
  }, [open]);

  return (
    <div className="modalContainernc" id="modalContainer">
      <h1>
        {informacionPaciente.diagnostico === "Sí"
          ? "Se detecto indicios de Maltrato Psicologico"
          : "No se detecto indicios de Maltrato Psicologico"}
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
      <label htmlFor="diagnosticoPsicologo">Diagnostico del Psicologo</label>
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
        <CustomButton content="Cancelar" onClick={onClose} />
        <CustomButton
          content="Guardar"
          onClick={() => {
            guardar();
            generatePDF();
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
