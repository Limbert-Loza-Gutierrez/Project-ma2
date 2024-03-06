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
  updateReportBase64 ,
}) => {
  // const [base64PDF, setBase64PDF] = useState("");
  if (!open) return null;
  const infoMedico = JSON.parse(localStorage.getItem("inforUser")) || {};
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
    pdf.text("Informe Psicológico", docWidth / 2, 20, { align: "center" });
    pdf.line(0, 25, docWidth, 25);

    // *Logotipo e imagen del paciente*

    pdf.addImage(logo, "PNG", 5, 0, 50, 50);
    pdf.addImage(informacionPaciente.imagen, "PNG", 100, 60,70, 70);

    // *Información del paciente*

    pdf.setFontSize(20);
    pdf.text("Nombre:", 10, 80);
    pdf.text(informacionPaciente.nombre, 50, 80);
    pdf.text("Edad:", 10, 95);
    pdf.text(informacionPaciente.edad, 50, 95);
   
    pdf.text("Fecha:", 10, 110);
    pdf.text(informacionPaciente.fechaDiagnostico, 50, 110);
    

    // *Línea divisoria*

    pdf.line(0, docHeight - 60, docWidth, docHeight - 60);

    // *Diagnóstico del Psicólogo*

    pdf.setFontSize(16);
    pdf.text("Diagnóstico del Sistema:", 10, docHeight - 40);
    pdf.text(informacionPaciente.diagnostico, 80, docHeight - 40);
    pdf.text("Diagnóstico del Psicólogo:", 10, docHeight - 50);
    const ds = pdf.splitTextToSize(diagnosticoPsicologo, docWidth - 50);
    pdf.text(ds, 80, docHeight - 50);

    // *¿Está de acuerdo con el diagnóstico?*

    let da = "";
    if (diagnosticoSeleccionado === "si") {
      da = "Si";
    } else if (diagnosticoSeleccionado === "no") {
      da = "No";
    } else {
      da = "No especificado";
    }
    pdf.text(`¿Está de acuerdo con el diagnóstico?: ${da}`, 10, 150);

    // *Pie de página*

    pdf.line(0, docHeight - 20, docWidth, docHeight - 20);
    pdf.setFontSize(10);
    pdf.text(`Elaborado por: ${infoMedico.nombre}`, 10, docHeight - 10);
    pdf.text(`Página ${pdf.internal.getNumberOfPages()}`, docWidth - 20, docHeight - 10, { align: "right" });
    
      // const pdf = new jsPDF();
      // pdf.setFontSize(40);
      // pdf.setFont("helvetica", "bold");
      // pdf.addImage(logo, "PNG", 5, 0, 50, 50);
      // pdf.addImage(informacionPaciente.imagen, "PNG", 5, 60, 200, 200);
      // pdf.setFontSize(20);
      // const docWidth = pdf.internal.pageSize.getWidth();
      // const docHeight = pdf.internal.pageSize.getHeight();
      // pdf.line(0, 60, docWidth, 60);
      // pdf.setFont("helvetica", "italic");
      // const splitDescription = pdf.splitTextToSize("REPORTE", docWidth - 20);
      // pdf.text(splitDescription, docWidth - 20, 45, { align: "right" });
      // pdf.setFontSize(20);
      // pdf.setFont("helvetica", "bold");
      // // Agregar datos al PDF
      // pdf.text(`Nombre: ${informacionPaciente.nombre}`, 10, 80);
      // pdf.text(`Edad: ${informacionPaciente.edad}`, 10, 95);
      // pdf.text(`Diagnostico del Sistema: ${informacionPaciente.diagnostico}`, 10, 105);
      // pdf.text(`Fecha: ${informacionPaciente.fechaDiagnostico}`, 10, 110);
      // pdf.line(0, docHeight - 60, docWidth, docHeight - 60);

      
      // // Agregar "Diagnostico del Psicologo" al PDF
      // pdf.text(`Diagnóstico del Psicólogo:`, 10, docHeight - 40);
      // const ds = pdf.splitTextToSize(diagnosticoPsicologo, docWidth - 20);
      // pdf.text(ds, 10, docHeight - 30);

      // // extraer de diagnosticoSeleccionado el valor
      // let da = "";
      // if (diagnosticoSeleccionado === "si") {
      //   da = "Si";
      // } else if (diagnosticoSeleccionado === "no") {
      //   da = "No";
      // } else {
      //   da = "No especificado";
      // }
      // console.log("=====>", da);
      // pdf.text(`¿Está de acuerdo con el diagnóstico?: ${da}`, 10, 150);

      // const pdfname =
      //   informacionPaciente.nombre + informacionPaciente.documento + ".pdf";
      // pdf.save(pdfname);
      const base64Data = pdf.output("datauristring");
      const informesPrevios = JSON.parse(localStorage.getItem("informes")) || [];
      const nuevoInforme = {
        pdf: base64Data,
        documento: informacionPaciente.documento,
      };
      informesPrevios.push(nuevoInforme);
      localStorage.setItem("informes", JSON.stringify(informesPrevios));
      console.log("Base64:", base64Data);
      updateReportBase64(base64Data);
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
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
    <div className="modalContainer" id="modalContainer">
      <h1>
        {
          informacionPaciente.diagnostico === "Sí" ? "Se detecto indicios de Maltrato Psicologico" : "No se detecto indicios de Maltrato Psicologico"
        }
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
        style={
          {
            "outline": "none",
            "border": "none",
            // display: block;
            // width: 100%;
            // background: #e6e6e6;
            // font-family: Montserrat-Bold;
            // font-size: 15px;
            // line-height: 1.5;
            "color": "#666",
            "display": "",
            "width": "95%",
            "background": "#e6e6e6",
            "fontFamily": "Montserrat-Bold",
            "borderRadius": "25px",
            "minHeight": "150px",
            "padding": "10px",

          }
        }
        onChange={(e) => setDiagnosticoPsicologo(e.target.value)}
      ></textarea>

      <div className="imprimird">
        <CustomButton content="Cancelar" onClick={onClose} />
        <CustomButton content="Guardar" onClick={()=>{
          guardar();
          generatePDF();
        }} />
        {/* <CustomButton content="Generar PDF" onClick={generatePDF} /> */}
      </div>
    </div>
  );
};

export default Modal;
