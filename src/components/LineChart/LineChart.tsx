import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

type lineChartProps = {
    data: number[];
};

export default function LineChart({ data }: lineChartProps) {
    data.shift();
    const chartData: ChartData<"line"> = {
        labels: data.map((d, i) => i + 1),
        datasets: [
            {
                label: "CPM",
                data: data,
                fill: true,
                backgroundColor: "rgba(0,0,0, 0.2)",
                borderColor: "#3B82F6",
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
        responsive: true,
        hover: {
            mode: "nearest",
            intersect: true,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (items) {
                        let titles = [];
                        for (const { dataIndex } of items) {
                            titles.push(`time : ${dataIndex + 1}s`);
                        }
                        return titles.join(" ");
                    },
                },
                intersect: false,
            },
            legend: {
                display: false,
            },
        },
    };

    return <Line data={chartData} options={options} />;
}
