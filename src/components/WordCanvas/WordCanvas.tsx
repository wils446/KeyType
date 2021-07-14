import React from "react";
import "./style.css";

type WordCanvasProps = {
    words: string;
    html: string;
};

export default function WordCanvas({ words, html }: WordCanvasProps): JSX.Element {
    return (
        <div className="word-canvas my-3 py-1 px-3">
            {html === "" ? (
                <h2 className="words">{words}</h2>
            ) : (
                <h2 className="words" dangerouslySetInnerHTML={{ __html: html }}></h2>
            )}
        </div>
    );
}
