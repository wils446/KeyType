import React from "react";
import "./style.css";

type InputTypeProps = {
    changeHandler: (value: string) => void;
    currentInputValue: string;
};

export default function InputType({ changeHandler, currentInputValue }: InputTypeProps): JSX.Element {
    return (
        <div className="px-5">
            <input
                type="text"
                onChange={(ev) => {
                    changeHandler(ev.target.value);
                }}
                className="input-form"
                value={currentInputValue}
            />
        </div>
    );
}
