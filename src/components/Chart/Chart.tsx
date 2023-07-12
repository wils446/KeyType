import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
	Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

type ChartProps = {
	data: number[];
};

export const Chart: React.FC<ChartProps> = ({ data }) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
		Filler
	);

	const options: ChartOptions<"line"> = {
		plugins: {
			title: {
				display: false,
				text: "Character Per Minutes",
				font: {
					size: 20,
				},
				color: "white",
				padding: { bottom: 24 },
				align: "start",
			},
			legend: {
				display: false,
			},

			tooltip: {
				backgroundColor: "#121212",
				titleColor: "white",
				displayColors: false,
				callbacks: {
					title: (tooltipItem) => {
						return tooltipItem.map(
							({ label }) => `CPM at ${label}s`
						);
					},
				},
				intersect: false,
			},
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					color: "white",
				},
				title: {
					display: true,
					text: "CPM",
					color: "white",
				},
			},
			x: {
				ticks: {
					color: "white",
				},
				title: {
					display: true,
					text: "Time (s)",
					color: "white",
				},
			},
		},
	};

	const chartData: ChartData<"line"> = {
		datasets: [
			{
				label: "CPM",
				data,
				borderColor: "#00ff99",
				tension: 0.1,
				fill: true,
			},
		],
		labels: Array.from({ length: data.length }, (_v, index) => index + 1),
	};

	return <Line options={options} data={chartData} />;
};
