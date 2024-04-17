const usuarios = {
  personal: [
    {
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "admin",
      documento: "123456789",
      expedicion: "admin",
      password: "123456789",
      nombreUsuario: "admin",
      tipoLaboral: "Administrador del sistema",
      correoInstitucional: "admin@admin.com",
      estado: "Activo",
      especialidad: "Super Administrador",
      nivelJerarquico: "Super Administrador",
    },
    {
      id: 1,
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "Juan David Perez Ramirez",
      documento: "12421511",
      expedicion: "LP",
      password: "123456789",
      nombreUsuario: "jperezr",
      tipoLaboral: "Medico",
      correoInstitucional: "admin@admin.com",
      estado: "Activo",
      especialidad: "Psicologo",
      nivelJerarquico: "Medico",
    },
  ],
  pacientes: [
    {
      id: 1,
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
