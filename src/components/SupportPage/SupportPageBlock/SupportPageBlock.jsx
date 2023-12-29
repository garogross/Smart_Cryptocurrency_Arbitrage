import React from 'react';
import Svg from "../../layout/Svg/Svg";
import {emailIcon, telegramIcon} from "../../../assets/svg";
import styles from "./SupportPageBlock.module.scss"
import {mailLink, telegramLink} from "../../../constants";

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
                        <a
                            href={mailLink}
                            target={"_blank"}
                            rel={'noreferrer'}
                            className={styles["supportBlock__btn"]}>
                            <Svg className={styles["supportBlock__btnIcon"]} id={emailIcon}/>
                            <p className={styles["supportBlock__btnText"]}>
                                Email:
                                <span className={styles["supportBlock__btnText_link"]}>info@1whale.io</span>
                            </p>
                        </a>
                        <a
                            target={"_blank"}
                            rel={'noreferrer'}
                            className={styles["supportBlock__btn"]}
                            href={telegramLink}
                        >
                            <Svg className={styles["supportBlock__btnIcon"]} id={telegramIcon}/>
                            <p className={styles["supportBlock__btnText"]}>
                                Telegram:
                                <sman className={styles["supportBlock__btnText_link"]}>@OneWhaleNews</sman>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupportPageBlock;