import React from 'react';
import Svg from "../../../layout/Svg/Svg";
import {crossIcon, eyeIcon} from "../../../../assets/svg";
import styles from "./ArbitragePageListItem.module.scss"
import {getCreatedAt} from "../../../../utils/functions/date";

function ArbitragePageListItem({
                                   AskAmount,
                                   AskCount,
                                   AskPrice,
                                   BidAmount,
                                   BidCount,
                                   BidPrice,
                                   Chain,
                                   Fee,
                                   Profit,
                                   SpotFee,
                                   Timestamp,
                                   Symbol,
                                   onAddToBlackList,
                                   onAddToHidden,
                                   Ex1,
                                   Ex2,
                                   isArb
                               }) {

    const today = new Date()

    const createdAt = getCreatedAt(Timestamp)

    const timestampText = today.getMinutes() - createdAt.getMinutes()


    return (
        <div className={styles["arbitrageListItem"]}>
            <div className={styles["arbitrageListItem__header"]}>
                <h5 className={styles["arbitrageListItem__title"]}>{Symbol.toUpperCase()}</h5>
                <div className={styles["arbitrageListItem__headerBtns"]}>
                    {
                        isArb ?
                            <>
                                <button
                                    onClick={() => onAddToHidden({Symbol, Ex1, Ex2})}
                                    className={styles["arbitrageListItem__hiderBtn"]}>
                                    <Svg className={styles["arbitrageListItem__hideIcon"]} id={eyeIcon}/>
                                </button>
                                <button
                                    className={styles["arbitrageListItem__hiderBtn"]}
                                    onClick={() => onAddToBlackList(Symbol)}
                                >
                                    <Svg className={styles["arbitrageListItem__crossIcon"]} id={crossIcon}/>
                                </button>
                            </> : null
                    }

                </div>
            </div>
            <div
                className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_output']}`}>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>BUY: </span>
                    {AskAmount} USDT
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>ASK: </span>
                    {AskPrice} - {AskCount} ордер
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Перевода: </span>
                    {Fee}$
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Спота: </span>
                    {SpotFee / 2}
                </p>
            </div>
            <div
                className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_input']}`}>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>SELL: </span>
                    {BidAmount} USDT
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>BID: </span>
                    {BidPrice} - {BidCount} ордеров
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Комиссия Спота: </span>
                    {SpotFee / 2}$
                </p>
            </div>
            <p className={styles["arbitrageListItem__profitText"]}>
                Profit:
                <span className={styles["arbitrageListItem__profitText_blue"]}> {Profit}$</span>
            </p>
            <p className={styles["arbitrageListItem__profitText"]}>
                Profit with Setting:
                <span className={styles["arbitrageListItem__profitText_blue"]}> 340$</span>
            </p>
            <div className={styles["arbitrageListItem__footer"]}>
                <p className={styles["arbitrageListItem__footerText"]}>{timestampText} minutes ago</p>
                <p className={styles["arbitrageListItem__footerText"]}>Spotted: about 6 hours ago</p>
            </div>
        </div>
    );
}

export default ArbitragePageListItem;