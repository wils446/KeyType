type DisplayWordsProps = {
    html: string;
};

export default function DisplayWords({ html }: DisplayWordsProps) {
    return (
        <div className="font-mono text-justify text-2xl">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}
