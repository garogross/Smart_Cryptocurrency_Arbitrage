import React from 'react';
import SecondaryBtn from "../../layout/SecondaryBtn/SecondaryBtn";
import styles from "./MainPageSignin.module.scss"
import {useNavigate} from "react-router-dom";
import loginPage from "../../../pages/LoginPage/LoginPage";
import {loginPagePath} from "../../../router/path";

function MainPageSignin(props) {
    const navigate = useNavigate()
    return (
        <div>
            <div className={styles["signin"]}>
                <div className={`${styles["signin__container"]} container`}>>
                    <h2 className={`${styles["signin__title"]} titleTxt`}>Погрузись в Крипто-Арбитраж. Начни
                        использовать <span className={'blueText'}>1whale</span> сегодня.</h2>
                    <p className={`${styles["signin__text"]} contentTxt`}>Присоединяйся сообществу 1whale с набором
                        мощных инструментов анализы рынка крипто-арбитража,
                        чтобы отслеживать лучшие моменты для заработка денег на рынке криптовалюты.</p>
                    <SecondaryBtn
                        onClick={() => navigate(loginPagePath)}
                    >Sign-In / Login</SecondaryBtn>
                </div>
            </div>
        </div>
    );
}

export default MainPageSignin;