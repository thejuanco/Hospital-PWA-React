import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UrgencyChart = ({ studios }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (studios.length > 0) {
      // Contar la frecuencia de cada nivel de urgencia
      const urgencyLevels = studios.reduce((acc, studio) => {
        acc[studio.Nivel_Urgencia] = (acc[studio.Nivel_Urgencia] || 0) + 1;
        return acc;
      }, {});

      // Preparar datos para Chart.js
      setChartData({
        labels: Object.keys(urgencyLevels),
        datasets: [
          {
            label: "Niveles de Urgencia",
            data: Object.values(urgencyLevels),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [studios]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4"
      style={{
        maxWidth: "350px", // Ancho máximo
        margin: "0 auto", // Centrar en la pantalla
      }}
    >
      <h2 className="font-semibold text-xl mb-4">Niveles de Urgencia</h2>
      {chartData.labels ? (
        <Pie data={chartData} />
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default UrgencyChart;
