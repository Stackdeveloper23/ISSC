import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Config from '../../Config';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

export default function Grafico() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "User Rol",
                data: [],
                backgroundColor: [
                    "rgba(50, 205, 50, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Config.getUserCount();
                console.log("respuesta ", response)
                const data = response.data;

                const labels = data.map(item => item.name);
                const datasetData = data.map(item => item.user_count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Rol de usuario",
                            data: datasetData,
                            backgroundColor: [
                                "rgba(50, 205, 50, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                            ],
                            borderColor: [
                                "rgba(50, 205, 50, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                            ],
                            borderWidth: 2,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }

        fetchData();
    }, []);  

    return <Pie data={chartData} options={options} />;
}



