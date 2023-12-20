import React from 'react';
import styles from "./MainInput.module.scss"

function MainInput({
                       className,
                       isInvalid,
                       onChange,
                       value,
                       icon,
                       ...properties
                   }) {

    return (
        <input
            onChange={onChange}
            value={value}
            style={{backgroundImage: icon ? `url(${icon})` : 'none'}}
            className={
                `${styles['mainInput']} ${className ? className : ''} ` +
                `${isInvalid ? styles['mainInput_invalid'] : ""} ` +
                `${icon ? styles['mainInput_withIcon'] : ""}`
            }
            {...properties}

        />
    );
}

export default MainInput;