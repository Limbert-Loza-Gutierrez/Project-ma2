import React, { useState, useEffect } from 'react';
import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../../../public/image/logo.jpg"
const Modal = ({ open, onClose, informacionPaciente }) => {
  if (!open) return null;
  const [diagnosticoPsicologo, setDiagnosticoPsicologo] = useState('');

  const generatePDF = async () => {
    const modalElement = document.getElementById('modalContainer');
    const diagnosticoPsicologo = document.getElementById('diagnosticoPsicologo').value;
    const diagnosticoSelectElement = document.querySelector('.diagnosticoSelect');
    const diagnosticoSeleccionado = diagnosticoSelectElement.value;

    try {
      const canvas = await html2canvas(modalElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.setFontSize(40);
      pdf.setFont("helvetica","bold")
      pdf.addImage(logo,"PNG",5,0,50,50)
      pdf.setFontSize(20);
  const docWidth = pdf.internal.pageSize.getWidth();
  const docHeight = pdf.internal.pageSize.getHeight();
  pdf.line(0, 60, docWidth, 60);
  pdf.setFont("helvetica", "italic");
  const splitDescription = pdf.splitTextToSize(
    "REPORTE",
    docWidth - 20
  );
  pdf.text(splitDescription, docWidth -20, 45, {align:"right"});
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
      // Agregar datos al PDF
      pdf.text(`Nombre: ${informacionPaciente.nombre}`, 10, 80);
      pdf.text(`Edad: ${informacionPaciente.edad}`,  10, 95 );
      pdf.text(`Fecha: ${informacionPaciente.fechaDiagnostico}`,  10, 110);
      pdf.line(0, docHeight - 60, docWidth, docHeight - 60);
      // Agregar "Diagnostico del Psicologo" al PDF
      pdf.text(`Diagnóstico del Psicólogo:`, 10,docHeight -40);
      const ds=pdf.splitTextToSize(
        diagnosticoPsicologo, docWidth -20
      )
      pdf.text(ds, 10,docHeight -30);


      // extraer de diagnosticoSeleccionado el valor 
      let da = '';
      if (diagnosticoSeleccionado === 'si') {
        da = 'Si';
      } else if (diagnosticoSeleccionado === 'no') {
        da = 'No';
      } else {
        da = 'No especificado';
      }
      console.log("=====>",da)
      pdf.text(`¿Está de acuerdo con el diagnóstico?: ${da}`, 10, 150);

const pdfname = informacionPaciente.nombre + informacionPaciente.documento + '.pdf';
      pdf.save(pdfname);
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    if (open) {
      const diagnosticoSelectElement = document.querySelector('.diagnosticoSelect');
      if (diagnosticoSelectElement) {
        console.log('Elemento Seleccionado de Diagnóstico Encontrado:', diagnosticoSelectElement.value); // Para depuración
      } else {
        console.error('Elemento Seleccionado de Diagnóstico No Encontrado');
      }
    }
  }, [open]);


  

  return (
    <div className='modalContainer' id='modalContainer'>
      <h1>
        {informacionPaciente.diagnostico === "No"
          ? "No se detectaron indicios de maltrato infantil"
          : "Se detectaron indicios de maltrato infantil"}
      </h1>
      <label htmlFor="diagnosticoSelect">
        ¿Está de acuerdo con el diagnóstico?
      </label>
      <select className='diagnosticoSelect' 
        name="diagnosticoSelect" id="diagnosticoSelect">
        <option value="si">Si</option>
        <option value="no">No</option>
      </select>
      <label htmlFor="diagnosticoPsicologo">Diagnostico del Psicologo</label>
      <textarea
        className='diagnosticoPsicologo'
        name="diagnosticoPsicologo"
        id="diagnosticoPsicologo"
        cols="30"
        rows="10"
        value={diagnosticoPsicologo}
        onChange={(e) => setDiagnosticoPsicologo(e.target.value)}
      ></textarea>
      
      <div className='imprimird'>
      <CustomButton content="Cancelar" onClick={generatePDF} />
      <CustomButton content="Guardar" onClick={onClose} />

      </div>
    </div>
  );
};

export default Modal;
