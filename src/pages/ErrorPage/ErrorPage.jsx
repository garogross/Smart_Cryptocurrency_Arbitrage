import React from 'react';
import {errorImage} from "../../assets/images";
import styles from "./ErrorPage.module.scss"

function ErrorPage() {
    return (
            <div className={styles["error"]}>
                <div className={styles["error__container"]}>
                    <img src={errorImage} alt="" className={styles["error__img"]}/>
                    <h2 className={styles["error__title"]}>Page Not Found</h2>
                </div>
            </div>
    );
}

export default ErrorPage;