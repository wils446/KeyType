import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

type lineChartProps = {
    data: number[];
};

export default function LineChart({ data }: lineChartProps) {
    data.shift();
    console.log(data);
    const chartData: ChartData<"line"> = {
        labels: data.map((d, i) => i + 1),
        datasets: [
            {
                label: "CPM",
                data: data,
                fill: false,
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                tension: 0.3,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "CPM",
                },
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Time (s)",
                },
            },
        },
        elements: {
            point: {
                radius: 2,
            },
        },
    };

    return <Line data={chartData} options={options} />;
}
