import { selectGameConfigState } from "@/redux/features";
import { useAppSelector } from "@/redux/hooks";
import { useMemo, useRef, useState } from "react";

type TypingBoardProps = {
	typingInput: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isWrong: boolean;
};

export const TypingBoard: React.FC<TypingBoardProps> = ({
	typingInput,
	onInputChange,
	isWrong,
}) => {
	const { words } = useAppSelector(selectGameConfigState);

	const inputEl = useRef<HTMLInputElement>(null);
	const [isOnFocus, setIsOnFocus] = useState(false);

	const displayWords = useMemo(() => {
		return words.split("").map((char, index) => (
			<span
				key={index}
				className={`decoration-white duration-100 ${
					isWrong && index === typingInput.length
						? "text-red-500 decoration-red-500"
						: index < typingInput.length
						? "text-white"
						: "text-gray-500"
				} ${
					index === typingInput.length && isOnFocus
						? "bg-neutral-100"
						: ""
				} `}
			>
				{char || " "}
			</span>
		));
	}, [typingInput, isWrong, words, isOnFocus]);

	return (
		<>
			<div className="relative">
				<h1
					className="font-mono text-2xl tracking-widest hover:cursor-text z-50 relative"
					onClick={() => {
						inputEl.current?.focus();
					}}
				>
					{displayWords}
				</h1>
			</div>
			<input
				type="text"
				className="opacity-0 w-0 h-0"
				ref={inputEl}
				value={typingInput}
				onChange={onInputChange}
				onFocus={() => setIsOnFocus(true)}
				onBlur={() => setIsOnFocus(false)}
			/>
		</>
	);
};
