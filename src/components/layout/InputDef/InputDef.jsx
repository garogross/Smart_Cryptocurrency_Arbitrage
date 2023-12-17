import React from 'react';

function InputDef({className, isInvalid, isTextArea, onChange, value, ...properties}) {

    let content;

    if (isTextArea) {
        content = (
                <textarea
                    value={value}
                    onChange={onChange}
                    {...properties}
                    className={`textAreaDef inputDef scrollbarDef ${className ? className : ''} ${isInvalid ? 'inputDef_invalid' : ""}`}
                ></textarea>
        )
    } else {
        content = (
            <input
                {...properties}
                onChange={onChange}
                value={value}
                className={`inputDef ${className ? className : ''} ${isInvalid ? 'inputDef_invalid' : ""}`}
            />)

    }

    return content;
}

export default InputDef;