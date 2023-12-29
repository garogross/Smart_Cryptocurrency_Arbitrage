import React, {memo} from 'react';

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
                `mainInput ${className ? className : ''} ` +
                `${isInvalid ? 'mainInput_invalid' : ""} ` +
                `${icon ? 'mainInput_withIcon' : ""}`
            }
            {...properties}

        />
    );
})

export default MainInput;