import React from 'react';

import Svg from "../Svg/Svg";

import {crossIcon} from "../../../assets/svg";
import styles from "./CloseBtn.module.scss"

function CloseBtn({onClose}) {
    return (
        <button onClick={onClose} className={styles["closeBtn"]}>
            <Svg
                id={crossIcon}
                className={styles["closeBtn__icon"]}
            />
        </button>
    );
}

export default CloseBtn;