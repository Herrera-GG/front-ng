import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { useState } from "react";
import { Bar as BarC } from "react-chartjs-2";

function Bar({ datos, title = "Texto de ejemplo" }) {
  Chart.register(
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    Title,
    Tooltip,
    Legend,
    BarElement
  );
  const generateRandomRGBA = () => {
    // Genera un valor aleatorio entre 0 y 255 para R, G, B
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Genera un valor aleatorio entre 0 y 1 para A, con dos decimales
    const a = Math.random().toFixed(2);

    // Devuelve el color en formato rgba
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };
  const background = [
    "#37a2ea",
    "#ff6961",
    "#4ac0c0",
    "#9866fb",
    "#fbb474",
    "#ff6484",
    "#74bbfb",
    "#fdcf57",
    "#d3d3d3",
  ];

  const newData = datos
    ? {
        ...datos,
        datasets: datos.datasets.map((el, index) => ({
          ...el,
          backgroundColor: background[index],
        })),
      }
    : { labels: [""], datasets: [{ label: "si", data: [1] }] };

  const options = {
    responsive: true,
    animation: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return (
    <BarC data={newData} options={options}>
      Bar
    </BarC>
  );
}

export default Bar;
