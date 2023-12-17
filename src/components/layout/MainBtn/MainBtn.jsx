import React, {memo} from 'react';

import styles from "./MainBtn.module.scss"

const MainBtn = memo(({className,children,...properties}) => {
    return (
        <button
            className={`${styles['mainBtn']} ${className ? className : ''}`}
            {...properties}
        >{children}</button>
    );
})

export default MainBtn;