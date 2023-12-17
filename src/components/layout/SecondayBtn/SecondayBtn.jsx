import React, {memo} from 'react';

import styles from "./SecondayBtn.module.scss"

const SecondayBtn = memo(({className,children,...properties}) => {
    return (
        <button
            className={`${styles['mainBtn']} ${className ? className : ''}`}
            {...properties}
        >{children}</button>
    );
})

export default SecondayBtn;