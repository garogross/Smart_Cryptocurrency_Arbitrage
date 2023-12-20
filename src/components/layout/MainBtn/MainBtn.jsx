import React, {memo} from 'react';

import styles from "./MainBtn.module.scss"

const MainBtn = memo(({className,isPassive,children,...properties}) => {
    return (
        <button
            className={`${styles['mainBtn']} ${isPassive ? styles['mainBtn_passive'] : ''} ${className ? className : ''}`}
            {...properties}
        >{children}</button>
    );
})

export default MainBtn;