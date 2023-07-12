import { selectGameConfigState } from "./redux/features";
import { useAppSelector } from "./redux/hooks";
import { Game, Score } from "./views";

function App() {
	const { showScore } = useAppSelector(selectGameConfigState);

	return (
		<div className="h-screen w-screen bg-gradient-to-tr from-[#03002e] to-blue-950 flex flex-col items-center brand space-y-16">
			<div className="basis-0"></div>
			<h1 className="text-white text-7xl font-bold">KeyType</h1>
			<div className="w-full flex justify-center">
				{showScore ? <Score /> : <Game />}
			</div>
		</div>
	);
}

export default App;
