const usuarios = {
  personal: [
    {
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "admin",
      documento: "123456789",
      expedicion: "admin",
      nombreUsuario: "admin",
      tipoLaboral: "Administrador del sistema",
      correo: "admin@admin.com",
      estado: "Activo",
      especialidad: "Super Administrador",
      nivelJerarquico: "Super Administrador",
    },
    {
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "Juan David Perez Ramirez",
      documento: "12421511",
      expedicion: "LP",
      nombreUsuario: "jperezr",
      tipoLaboral: "Medico",
      correo: "admin@admin.com",
      estado: "Activo",
      especialidad: "Psicologo",
      nivelJerarquico: "Medico",
    },
  ],
  pacientes: [
    {
      nombre: "Leonel Sanchez Barra",
      documento: "12323323",
      expedicion: "LP",
      sexo: "Masculino",
      edad: 5,
      fechaDiagnostico: "20-01-2024",
      diagnostico: "Sí",
      imgDiagnostData: "/",
      nombreMedico: "Juan David Perez Ramirez",
    },
  ],
};

export default usuarios;
