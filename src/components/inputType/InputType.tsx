import React from "react";
import "./style.css";

type InputTypeProps = {
    changeHandler: (value: string) => void;
};

export default function InputType({ changeHandler }: InputTypeProps): JSX.Element {
    return (
        <div className="px-5">
            <input
                type="text"
                onChange={(ev) => {
                    changeHandler(ev.target.value);
                }}
                className="input-form"
            />
        </div>
    );
}
