import React, {useState} from 'react';
import Backdrop from "../../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";

import styles from "./SubscriptionBlockModal.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {checkIsSubscribed} from "../../../../redux/action/auth";
import Loader from "../../../layout/Loader/Loader";
import {subscriptionTypes} from "../../../../constants";

function SubscriptionBlockModal({show, onClose}) {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.getUserLoading)
    const user = useSelector(state => state.auth.user)

    let subscribtionText = ''

    switch (user.subscription) {
        case subscriptionTypes.free: {
            subscribtionText = 'бесплатную'
            break;
        }
        case subscriptionTypes.arb: {
            subscribtionText = 'Arbitrage Bot'
            break;
        }
    }

    if(user.subscribtion === subscriptionTypes.free) {}

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
                    <h4 className={styles["subscriptionBlockModal__title"]}>Если вы уже зарегистрировались, нажмите
                        кнопку "Обновить"</h4>
                    <p className={styles["subscriptionBlockModal__text"]}>Вы подписаны на {subscribtionText} подписку</p>
                    <TransitionProvider
                        duration={100}
                        inProp={loading}
                        style={'height'}
                        height={'60px'}
                        className={styles["subscriptionBlockModal__loader"]}
                    >
                        <Loader
                            size={40}
                            borderSize={3}
                        />
                    </TransitionProvider>
                    <div className={styles["subscriptionBlockModal__btns"]}>
                        <MainBtn
                            onClick={onClose}
                            isPassive={true}
                            disabled={loading}
                        >Отменить</MainBtn>
                        <MainBtn
                            disabled={loading}
                            onClick={() => dispatch(checkIsSubscribed())}
                        >Обновить</MainBtn>
                        <MainBtn
                            disabled={loading}
                        >Subscribe</MainBtn>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default SubscriptionBlockModal;