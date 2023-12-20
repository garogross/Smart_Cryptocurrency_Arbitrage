import React from 'react';
import Backdrop from "../../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";

import styles from "./SubscriptionBlockModal.module.scss"

function SubscriptionBlockModal({show, onClose}) {
    return (
        <>
            <Backdrop onClose={onClose} inProp={show}/>
            <NewPortalProvider>
                <TransitionProvider
                    style={'opacity'}
                    inProp={show}
                    className={styles["subscriptionBlockModal"]}
                >
                    <CrossBtn onClick={onClose}/>
                    <h4 className={styles["subscriptionBlockModal__title"]}>Если вы уже зарегистрировались, нажмите кнопку "Обновить"</h4>
                    <div className={styles["subscriptionBlockModal__btns"]}>
                        <MainBtn
                            onClick={onClose}
                        isPassive={true}
                        >Отменить</MainBtn>
                        <MainBtn

                        >Обновить</MainBtn>
                        <MainBtn

                        >Subscribe</MainBtn>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default SubscriptionBlockModal;