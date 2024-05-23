import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar as BarC } from "react-chartjs-2";

function Bar({
  datos = { labels: [], datasets: [] },
  title = "Texto de ejemplo",
}) {
  Chart.register(
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    Title,
    Tooltip,
    Legend
  );
  const [data, setData] = useState(datos);

  const options = {
    responsive: true,
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
    <BarC data={data} options={options}>
      Bar
    </BarC>
  );
}

export default Bar;
