import React from 'react';
import styles from "./AbsoluteBlock.module.scss";

function AbsoluteBlock({isRed,className,children}) {
    const color = isRed ? 'red' : 'green'
    return (
        <div
            className={
                `${styles["absoluteBlock"]} ` +
                `${styles["absoluteBlock_" + color]} ` +
                `${className}`}
        >
            <p>{children}</p>
        </div>
    )
}

export default AbsoluteBlock;