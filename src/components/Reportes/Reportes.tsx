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

function Reportes() {
    let pacientes = JSON.parse(
        window.localStorage.getItem("listPacientes") as string
    );
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

    console.log(edades);

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
        paciente.fechaDiagnostico = paciente.fechaDiagnostico
            .split("-")
            .reverse()
            .join("-");
        const fecha = new Date(paciente.fechaDiagnostico);
        const mes = fecha.getMonth();
        if (paciente.diagnostico === "Sí") {
            mesesPositivos[mes]++;
        } else {
            mesesNegativos[mes]++;
        }
    });
    console.log(mesesPositivos);
    console.log(mesesNegativos);
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

    return (
        <div className="window-content">
            <div className="reportes">
                <div className="genero-reporte container-grafico">
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            color: "black",
                            marginBottom: "1rem",
                        }}
                    >
                        Reporte por género{" "}
                    </h1>
                    <div className="grafico">
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
