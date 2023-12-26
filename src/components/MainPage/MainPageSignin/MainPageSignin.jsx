import React from 'react';
import SecondaryBtn from "../../layout/SecondaryBtn/SecondaryBtn";
import styles from "./MainPageSignin.module.scss"
import {useNavigate} from "react-router-dom";
import {loginPagePath} from "../../../router/path";
import {useSelector} from "react-redux";

function MainPageSignin() {
    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate()
    return (
        <>
            {
                !token ?
                    <div className={styles["signin"]}>
                        <div className={`${styles["signin__container"]} container`}>`
                            <h2 className={`${styles["signin__title"]} titleTxt`}>Погрузись в
                                Крипто-Арбитраж.<br/> Начни
                                использовать <span className={'blueText'}>1whale</span> сегодня.</h2>
                            <p className={`${styles["signin__text"]} contentTxt`}>Присоединяйся сообществу 1whale с
                                набором
                                мощных инструментов анализы рынка крипто-арбитража,<br/>
                                чтобы отслеживать лучшие моменты для заработка денег на рынке криптовалюты.</p>
                            <SecondaryBtn
                                onClick={() => navigate(loginPagePath)}
                            >Sign-In / Login</SecondaryBtn>
                        </div>
                    </div> : null
            }
        </>
    );
}

export default MainPageSignin;