type LangOptionsProps = {
    changeHandler: (str: string) => void;
};

export default function LangOptions({ changeHandler }: LangOptionsProps) {
    const lang = ["indonesia"];

    const Options = lang.map((lang, index) => {
        return (
            <option key={index} value={lang} className="py-2">
                {lang}
            </option>
        );
    });

    return (
        <div className="text-left">
            <select name="" onChange={(e) => changeHandler(e.target.value)} id="">
                {Options}
            </select>
        </div>
    );
}
