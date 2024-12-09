import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import useAxios from "../../api/api.auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudyStatusChart = () => {
  const [statusData, setStatusData] = useState({});
  const axiosInstance = useAxios();
  const [queryAPI, setQueryAPI] = useState(true);

  useEffect(() => {
    const fetchStudyResults = async () => {
      try {
        const response = await axiosInstance.get("/resultados_estudios");

        // Contar los estatus
        const statusCounts = response.data.reduce((acc, study) => {
          acc[study.Estatus] = (acc[study.Estatus] || 0) + 1;
          return acc;
        }, {});

        setStatusData(statusCounts);
        setQueryAPI(false);
      } catch (error) {
        console.error("Error fetching study results:", error);
      }
    };

    if (queryAPI) {
      fetchStudyResults();
    }
  }, [queryAPI]);

  // Configuración de datos para la gráfica
  const chartData = {
    labels: Object.keys(statusData), // Estatus únicos
    datasets: [
      {
        label: "Cantidad de estudios",
        data: Object.values(statusData), // Cantidad por estatus
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <h2 className="font-semibold text-2xl mb-4 text-center">Gráfica de Estatus de Resultados</h2>
      {Object.keys(statusData).length > 0 ? (
        <div className="w-full sm:w-2/3 mx-auto">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Distribución de Estatus de Estudios",
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-500">Cargando datos de los estudios...</p>
      )}
    </div>
  );
};

export default StudyStatusChart;
