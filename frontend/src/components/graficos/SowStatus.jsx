import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Config from "../../Config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SowStatus() {
  const [chartData, setChartData] = useState({
    labels: ["NEW", "IN PROGRESS", "CLOSED", "BLOCKED", "CANCELLED"],
    datasets: [
      {
        label: "Quantity",
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(50, 205, 50, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(175, 238, 218, 1.0)"
        ],
      },
    ],
  });

  const misoptions = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 50,
      },
      x: {
        ticks: { color: "rgba(0, 0, 0, 1)" },
      },
    },
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Config.getSowStatus();

      const initialData = {
        NEW: 0,
        "IN PROGRESS": 0,
        CLOSED: 0,
        BLOCKED: 0,
        CANCELLED: 0,
      };
      response.data.forEach((item) => {
        initialData[item.sow_status.toUpperCase()] = item.total;
      });
      const data = chartData.labels.map((label) => initialData[label]);

      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: data,
          },
        ],
      }));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  fetchData();
}, []);


  return <Bar data={chartData} options={misoptions} />;
}
