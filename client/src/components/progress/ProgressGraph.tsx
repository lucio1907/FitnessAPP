"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  Filler
);

const ProgressGraph = ({
  dataProp,
  labels,
}: {
  dataProp: number[];
  labels: number[];
}): React.ReactElement => {
  const data = {
    labels: dataProp, // Eje X: etiquetas
    datasets: [
      {
        label: "Progress",
        data: labels, // Eje Y: datos
        fill: true, // Para rellenar el área debajo de la línea
        backgroundColor: "#fb4f93", // Color del relleno
        borderColor: "rgba(79, 251, 203, 0.7)", // Color de la línea
        tension: 0.4, // Para una línea suavizada
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Your Progress",
        color: "#fb4f93",
        font: {
          size: 22,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Sets", // Título para el eje X
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Weights", // Título para el eje Y
        },
        ticks: {},
      },
    },
  };

  return (
    <div className="w-full flex flex-col">
      <div className="h-full flex justify-center items-center px-5">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressGraph;
