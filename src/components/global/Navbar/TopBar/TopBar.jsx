import React, {useEffect, useState} from 'react';
import styles from "./TopBar.module.scss"
import Svg from "../../../layout/Svg/Svg";
import {burgerIcon} from "../../../../assets/svg";
import {navLogoImage} from "../../../../assets/images";
import {useLocation, useNavigate} from "react-router-dom";
import {mainPagePath} from "../../../../router/path";

function TopBar({burgerOpened,onOpenBurger}) {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)

    console.log(pathname)
    useEffect(() => {
        if(pathname === mainPagePath) {
            window.addEventListener('scroll', checkIsScrolled);
        } else {
            setIsScrolled(true)
        }

        return () => {
            window.removeEventListener('scroll', checkIsScrolled);
        }
        // eslint-disable-next-line
    }, [isScrolled,pathname])

    const checkIsScrolled = () => {
        if (window.scrollY > 20) {
            if(!isScrolled) setIsScrolled(true)
        } else if (window.scrollY <= 20) {
            setIsScrolled(false)
        }
    }

    return (
        <>
        <div className={
            `${styles["topBar"]} `+
            `${isScrolled ? styles["topBar_active"] : ""} `+
            `${burgerOpened ? styles["topBar_hidden"] : ""} `
        }>
                <div style={{flex: 1}}>
                    <button
                        className={`${styles["topBar__burgerBtn"]} ${isScrolled ? styles["topBar__burgerBtn_active"] : ""}`}
                        onClick={onOpenBurger}
                    >
                        <Svg
                            id={burgerIcon}
                            className={styles["topBar__burgerIcon"]}
                        />
                    </button>
                </div>
                <button
                    onClick={() => navigate(mainPagePath)}
                    className={styles["topBar__logoBtn"]}>
                    <img src={navLogoImage} alt="logo" className={styles["topBar__logo"]}/>
                </button>
                <div style={{flex: 1}}></div>
        </div>
            {
                pathname !== mainPagePath ?
                <div
                    className={
                    `${styles['topBar__distanceBlock']} `+
                    `${!burgerOpened ? styles['topBar__distanceBlock_active'] : ""}`}
                ></div> : null
            }
        </>
    );
}

export default TopBar;