import React, {memo} from 'react';
import styles from "./MainInput.module.scss"

const MainInput = memo(({
                       className,
                       isInvalid,
                       onChange,
                       value,
                       icon,
                       ...properties
                   }) => {


    return (
        <input
            autoComplete={'off'}
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
})

export default MainInput;