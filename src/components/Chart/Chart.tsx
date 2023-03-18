import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Filler,
} from "chart.js";
import { ChartProps, Line } from "react-chartjs-2";

type Props = ChartProps<"line">;

const Chart: React.FC<Props> = (props) => {
    ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Filler);
    const chartOpts: ChartOptions<"line"> = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function (items) {
                        let titles = [];
                        for (const { dataIndex } of items) {
                            titles.push(`Time : ${dataIndex + 1}s`);
                        }

                        return titles.join(" ");
                    },
                },
                intersect: false,
            },
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Time (s)",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "CPM",
                },
            },
        },
    };

    return <Line className="mx-auto h-full" options={chartOpts} {...props} />;
};

export default Chart;
