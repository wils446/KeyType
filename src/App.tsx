import { selectGameConfigState } from "./redux/features";
import { useAppSelector } from "./redux/hooks";
import { Game, Score } from "./views";
import DocumentMeta, { DocumentMetaProps } from "react-document-meta";

function App() {
	const { showScore } = useAppSelector(selectGameConfigState);

	const meta: DocumentMetaProps = {
		title: "KeyType",
		description: "Simple Typing Game",
	};

	return (
		<DocumentMeta {...meta}>
			<div className="h-screen w-screen bg-gradient-to-tr from-[#03002e] to-blue-950 flex flex-col items-center brand space-y-16">
				<div className="basis-0"></div>
				<h1 className="text-white text-7xl font-bold">KeyType</h1>
				<div className="w-full flex justify-center">
					{showScore ? <Score /> : <Game />}
				</div>
			</div>
		</DocumentMeta>
	);
}

export default App;
