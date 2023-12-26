import React from 'react';
import styles from "./MainPageHeader.module.scss"
import {headerSharkImage} from "../../../assets/images";
import SecondaryBtn from "../../layout/SecondaryBtn/SecondaryBtn";
import {useNavigate} from "react-router-dom";
import {loginPagePath, signUpPagePath} from "../../../router/path";
import {useSelector} from "react-redux";

function MainPageHeader() {
    const token = useSelector(state => state.auth.token)


    const navigate = useNavigate()
    return (
        <div className={styles["mainPageHeader"]}>
            <div className={`${styles["mainPageHeader__container"]} container`}>
                <div className={styles["mainPageHeader__textBlock"]}>
                    <h1 className={styles["mainPageHeader__title"]}>
                        <p>Smart</p>
                        <p>Cryptocurrency</p>
                        <p>Arbitrage</p>
                    </h1>
                    {
                        !token ?
                            <div className={styles["mainPageHeader__buttons"]}>
                                <SecondaryBtn onClick={() => navigate(signUpPagePath)}>Start Free
                                    Trial</SecondaryBtn>
                                <button
                                    onClick={() => navigate(loginPagePath)}
                                    className={styles["mainPageHeader__loginBtn"]}
                                >Login
                                </button>
                            </div>
                            : null
                    }

                </div>
                <div className={styles["mainPageHeader_imageBlock"]}>
                    <img src={headerSharkImage} alt="Shark" className={styles["mainPageHeader_image"]}/>
                </div>
            </div>
        </div>
    );
}

export default MainPageHeader;