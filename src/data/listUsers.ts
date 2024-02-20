const usuarios = {
  personal: [
    {
      id: 0,
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "admin",

      numeroDocumento: "123456789",
      expedicion: "admin",

      password: "123456789",
      nombreUsuario: "admin",

      informacionLaboral: {
        tipoLaboral: "Administrador del sistema",
        correoInstitucional: "admin@admin.com",
        estado: "Activo",
        especialidad: "Super Administrador",
        nivelJerarquico: "Super Administrador",
        
      },
    },
    {
      id: 1,
      imgPerfil: "https://cdn-icons-png.flaticon.com/512/6915/6915987.png",
      nombre: "Juan David Perez Ramirez",

      numeroDocumento: "123456789",
      expedicion: "LP",

      password: "123456789",
      nombreUsuario: "jperezr",

      informacionLaboral: {
        tipoLaboral: "Medico",
        correoInstitucional: "admin@admin.com",
        estado: "Activo",
        especialidad: "Psicologia",
        nivelJerarquico: "Medico",
        
      },
    },
  ],
  pacientes: [
    {
      id: 1,
      nombre: "Leonel Sanchez Barra",
      documento: "12421511",
      expedicion: "LP",
      sexo: "Masculino",
      edad: 15,
      fechaDiagnostico: "1996-06-12T00:00:00.000Z",
      diagnostico: "Sin diagnostico",
      imgDiagnostData: "/"
    },
    {
      id: 2,
      nombre: "Jorge Luis Tancara",
      documento: "12421511",
      expedicion: "LP",
      sexo: "Masculino",
      edad: 15,
      fechaDiagnostico: "1996-05-12T00:00:00.000Z",
      diagnostico: "Sin diagnostico",
      imgDiagnostData: "/"
    }
  ],
};

export default usuarios;
