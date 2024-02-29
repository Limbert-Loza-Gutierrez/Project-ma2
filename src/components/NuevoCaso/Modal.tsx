import React, { useState, useEffect } from 'react';
import CustomInput from "../customs/CustomInput/CustomInput";
import CustomButton from "../customs/CustomButton/CustomButton";
import CustomSelect from "../customs/CustomSelect/CustomSelect";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

      // Agregar datos al PDF
      pdf.text(`Nombre: ${informacionPaciente.nombre}`, 10, 20);
      pdf.text(`Edad: ${informacionPaciente.edad}`, 10, 30);
      pdf.text(`Fecha: ${informacionPaciente.fechaDiagnostico}`, 10, 40);

      // Agregar "Diagnostico del Psicologo" al PDF
      pdf.text(`Diagnóstico del Psicólogo:`, 10, 80, { fontSize: 14 });
      pdf.text(diagnosticoPsicologo, 10, 90, { fontSize: 12 });

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
      pdf.text(`¿Está de acuerdo con el diagnóstico?: ${da}`, 10, 100, { fontSize: 12 });

      // pdf.addImage(imgData, 'PNG', 10, 110, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20);
// pdf save debe tener el document y nombre d ifnormacioPaciente para descargarlo:
const pdfname = informacionPaciente.nombre + informacionPaciente.documento + '.pdf';
      // pdf.save('diagnosis-report.pdf');
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
      {/* <CustomButton content="Guardar" onClick={
        
      } /> */}
      <CustomButton content="Generar PDF" onClick={generatePDF} />
    </div>
  );
};

export default Modal;
