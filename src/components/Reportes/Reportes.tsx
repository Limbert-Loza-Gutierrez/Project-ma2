import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, PolarArea, Line } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import "./Reportes.styles.css";
import { useEffect, useState } from "react";

function Reportes() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [count, setCount] = useState({});
  console.log(count)
  function contarCoincidencias(datos) {
    let coincidencias = 0;
    let diferencias = 0;

    for (let dato of datos) {
        if (dato.dS === dato.dD) {
            coincidencias++;
        } else {
            diferencias++;
        }
    }

    return { coincidencias, diferencias };
}
  console.log(contarCoincidencias(diagnosticos))
  useEffect(() => {
    const getPacientes = collection(db, "paciente");
    const getDiagnosticos = collection(db, "reportes");
    getDocs(getPacientes).then((res) => {
      setPacientes(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    getDocs(getDiagnosticos).then((res) => {
      setDiagnosticos(res.docs.map((doc) => ({ ...doc.data()})));
      setCount(contarCoincidencias(diagnosticos));
    });
  }, []);

  let cantidadF = 0;
  let cantidadM = 0;
  pacientes.map((paciente) =>
    paciente.sexo === "Femenino" ? cantidadF++ : cantidadM++
  );

  let edades = Array(8).fill(0);

  pacientes.forEach((paciente) => {
    const edadIndex = paciente.edad - 5; // Ajustar el índice de acuerdo con la edad
    if (edadIndex >= 0 && edadIndex < edades.length) {
      edades[edadIndex]++;
    }
  });

  const meses = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const mesesPositivos = Array(12).fill(0);
  const mesesNegativos = Array(12).fill(0);

  pacientes.forEach((paciente) => {
    const fechad = paciente.fechaDiagnostico?.split("-").reverse().join("-");
    const fecha = new Date(fechad);
    const mes = fecha.getMonth();
    if (paciente.diagnostico === "Sí") {
      mesesPositivos[mes]++;
    } else {
      mesesNegativos[mes]++;
    }
  });
  const dataDeteccion = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Casos Positivos",
        data: mesesPositivos,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dataDeteccionNegativo = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Casos Negativos",
        data: mesesNegativos,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataEdad = {
    labels: [
      "5 años",
      "6 años",
      "7 años",
      "8 años",
      "9 años",
      "10 años",
      "11 años",
      "12 años",
    ],
    datasets: [
      {
        label: "Edades",
        data: edades,
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(118, 238, 198, 0.8)",
          "rgba(255, 228, 225, 0.7)",
          "rgba(230, 230, 250, 0.9)",
          "rgba(255, 165, 0, 1)",
          "rgba(77, 77, 77, 0.6)",
          "rgba(255, 215, 0, 0.8)",
          "rgba(0, 0, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: ["Genero"],
    datasets: [
      {
        label: "Niñas",
        data: [cantidadF],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Niños",
        data: [cantidadM],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataCoincidendes = {
    labels : ["Coincidencias y Diferencias"],
    datasets: [
      {
        label: "Coincidencias",
        data: [count.coincidencias],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Diferencias",
        data: [count.diferencias],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }
    ]
  }

  return (
    <div className="window-content">
      <div className="reportes">
        <div className="genero-reporte container-grafico">
          <div className="grafico-genero">
            <Bar
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              data={data}
            />

            <Bar
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              data={dataCoincidendes}
            />
          </div>
        </div>
        <div className="edad-reporte container-grafico">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "black",
              marginBottom: "1rem",
            }}
          >
            Reporte por edad
          </h1>
          <div className="grafico">
            <PolarArea
              options={{
                scales: {
                  y: {
                    // beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              data={dataEdad}
            />
          </div>
        </div>
        <div className="indicios-reporte container-grafico">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "black",
              marginBottom: "1rem",
            }}
          >
            Reporte de indicios
          </h1>
          <div className="grafico">
            <Line
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              data={dataDeteccion}
            />
            <Line
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1, // Esto asegura que la numeración en el eje y sea solo en números enteros
                    },
                  },
                },
              }}
              data={dataDeteccionNegativo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
