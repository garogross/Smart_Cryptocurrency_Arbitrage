import React from 'react';
import {comunityImage, comunityImageWebp} from "../../../assets/images";
import styles from "./MainPageCommunity.module.scss"
import ImageWebp from "../../layout/ImageWebp/ImageWebp";

function MainPageCommunity() {
    return (
        <div>
            <div className={styles["community"]}>
                <h2 className={`${styles["community__title"]} titleTxt`}>Communtiy</h2>
                <p className={`${styles["community__text"]} contentTxt`}>Мы развиваем наше сообщество опытных
                    арбитражников, как в публичных соц.сетях, так и на основе приват чата.<br/>
                    Проект нацелен на объединение smart арбитражников, а так же на развитие новых направлений как в
                    рынке арбитража, так и в направлениях AI мира криптовалюты."</p>
                <ImageWebp
                    srcSet={comunityImageWebp}
                    src={comunityImage}
                    alt="comunity"
                    className={styles["community__img"]}
                />
            </div>
        </div>
    );
}

export default MainPageCommunity;