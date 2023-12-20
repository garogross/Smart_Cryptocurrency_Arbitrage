import React, {useState} from 'react';
import styles from "./SubscriptionBlock.module.scss"
import MainBtn from "../../layout/MainBtn/MainBtn";
import Svg from "../../layout/Svg/Svg";
import {successIcon} from "../../../assets/svg";
import SubscriptionBlockModal from "./SubscriptionBlockModal/SubscriptionBlockModal";

function SubscriptionBlock(props) {
    const [selectedSubscribeType, setSelectedSubscribeType] = useState()

    const onSelectSubscribe = (type) => setSelectedSubscribeType(type)
    const closeModal = () => setSelectedSubscribeType(null)

    return (
        <>
            <div className={styles["subscriptionBlock"]}>
                <div className={styles["subscriptionBlock__box"]}>
                    <h5 className={styles["subscriptionBlock__boxTitle"]}>Free</h5>
                    <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]} ${styles["subscriptionBlock__boxDescriptionText"]}`}>Базовые
                        возможности, которые помогут начать погружение
                        в крипто-арбитраж.</p>
                    <p className={styles["subscriptionBlock__boxPriceText"]}>$0</p>
                    <MainBtn
                        className={styles["subscriptionBlock__btn"]}
                        onClick={() => onSelectSubscribe('free')}
                    >Выбрать</MainBtn>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>News
                                Free</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>Arbitrage
                                Free</p>
                        </div>
                    </div>
                </div>
                <div className={styles["subscriptionBlock__box"]}>
                    <h5 className={styles["subscriptionBlock__boxTitle"]}>Arbitrage Bot</h5>
                    <p className={`${`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`} ${styles["subscriptionBlock__boxDescriptionText"]}`}>Безграничные
                        возможности, за счёт которых, ты сможешь
                        обуздать CEX / DEX направления крипто-арбитража.</p>
                    <p className={styles["subscriptionBlock__boxPriceText"]}>$1200 / 6 мес.</p>
                    <MainBtn
                        className={styles["subscriptionBlock__btn"]}
                        onClick={() => onSelectSubscribe('free')}
                    >Выбрать</MainBtn>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>CEX
                                — CEX
                                Arbitrage Scanner</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>CEX
                                — DEX
                                Arbitrage Scanner</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>Arbitrage
                                News (Разбор актуальных новостей
                                +Live торговля)</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>Arbitrage
                                News (Разбор актуальных новостей
                                +Live торговля)</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>Дальнейший
                                доступ к новым Инструментам/
                                Функциям 1whale.io</p>
                        </div>
                    </div>
                    <div className={styles["subscriptionBlock__boxOptionBlock"]}>
                        <div className={styles["subscriptionBlock__boxOption"]}>
                            <Svg id={successIcon} className={styles["subscriptionBlock__boxOptionIcon"]}/>
                            <p className={`${styles["subscriptionBlock__boxText"]} ${styles["subscriptionBlock__boxOptionsText"]}`}>Поддержка
                                24/7</p>
                        </div>
                    </div>
                </div>
            </div>
            <SubscriptionBlockModal onClose={closeModal} show={selectedSubscribeType}/>
        </>
    );
}

export default SubscriptionBlock;