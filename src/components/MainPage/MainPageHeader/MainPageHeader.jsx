import React from 'react';
import styles from "./MainPageHeader.module.scss"
import {headerSharkImage} from "../../../assets/images";
import SecondaryBtn from "../../layout/SecondaryBtn/SecondaryBtn";
function MainPageHeader() {
    return (
            <div className={styles["mainPageHeader"]}>
                <div className={`${styles["mainPageHeader__container"]} container`}>
                    <div className={styles["mainPageHeader__textBlock"]}>
                        <h1 className={styles["mainPageHeader__title"]}>
                            <p>Smart</p>
                            <p>Cryptocurrency</p>
                            <p>Arbitrage</p>
                        </h1>
                        <div className={styles["mainPageHeader__buttons"]}>
                            <SecondaryBtn>Start Free Trial</SecondaryBtn>
                            <button className={styles["mainPageHeader__loginBtn"]}>Login</button>
                        </div>
                    </div>
                    <div className={styles["mainPageHeader_imageBlock"]}>
                        <img src={headerSharkImage} alt="Shark" className={styles["mainPageHeader_image"]}/>
                    </div>
                </div>
            </div>
    );
}

export default MainPageHeader;