import React from 'react';
import Svg from "../../layout/Svg/Svg";
import {emailIcon, telegramIcon} from "../../../assets/svg";
import styles from "./SupportPageBlock.module.scss"

function SupportPageBlock() {
    return (
        <>
            <div className={styles["supportBlock"]}>
                <h5 className={`${styles["supportBlock__routeTitle"]} pageRouteTitle`}>Главная > Support</h5>
                <div className={styles["supportBlock__main"]}>
                    <h3 className={styles["supportBlock__title"]}>Контакты</h3>
                    <p className={styles["supportBlock__text"]}>Свяжитесь с нами, чтобы обсудить ваши вопросы или
                        сообщить об
                        ошибке.</p>
                    <div className={styles["supportBlock__btns"]}>
                        <button className={styles["supportBlock__btn"]}>
                            <Svg className={styles["supportBlock__btnIcon"]} id={emailIcon}/>
                            <p className={styles["supportBlock__btnText"]}>
                                Email:
                                <a className={styles["supportBlock__btnText_link"]}>support@alphador.ai</a>
                            </p>
                        </button>
                        <button className={styles["supportBlock__btn"]}>
                            <Svg className={styles["supportBlock__btnIcon"]} id={telegramIcon}/>
                            <p className={styles["supportBlock__btnText"]}>
                                Telegram:
                                <a className={styles["supportBlock__btnText_link"]}>@shablon</a>
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupportPageBlock;