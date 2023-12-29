import React, {useState} from 'react';
import Backdrop from "../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import MainBtn from "../../layout/MainBtn/MainBtn";

import styles from "./MainPageRegisterPopup.module.scss"
import {useLocation} from "react-router-dom";
import {getLSItem, setLSItem} from "../../../utils/functions/localStorage";
import {lsProps} from "../../../utils/cookies";

function MainPageRegisterPopup(props) {
    const isRegistered = getLSItem(lsProps.isRegistered,true)
    const [isOpened, setIsOpened] = useState(!!(isRegistered))

    const onClose = () => {
        setIsOpened(false)
        setLSItem(lsProps.isRegistered,false)
    }

    return (
        <>
            <Backdrop inProp={isOpened} onClose={onClose} highZIndex={true}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={styles["mainRegisterPopup"]}
                    style={'opacity'}
                    inProp={isOpened}
                >
                    <h4 className={styles["mainRegisterPopup__title"]}>Ваша регистрация завершена.</h4>
                    <p className={styles["mainRegisterPopup__text"]}>Спасибо, что присоединились к нашему
                        сообществу!</p>
                    <MainBtn
                        onClick={onClose}
                        className={styles["mainRegisterPopup__btn"]}
                    >OK</MainBtn>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default MainPageRegisterPopup;