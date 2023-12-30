import React from 'react';
import Svg from "../../../layout/Svg/Svg";
import {crossIcon, eyeIcon} from "../../../../assets/svg";
import styles from "./ArbitragePageListItem.module.scss"
import {getCreatedAt} from "../../../../utils/functions/date";

function ArbitragePageListItem({
                                   AskAmount,
                                   AskCount,
                                   AskAmountUSDT,
                                   BidAmountUSDT,
                                   BidPrice,
                                   BidAmount,
                                   BidCount,
                                   Chain,
                                   FeeUSDT,
                                   Profit,
                                   SpotFee,
                                   Timestamp,
                                   Symbol,
                                   onAddToBlackList,
                                   onAddToHidden,
                                   Ex1,
                                   Ex2,
                                   isArb,
                                   Link1,
                                   Link2,
                                   Straight,
                                   Spoted
                               }) {

    const today = new Date()

    const timeStampCreatedAt = getCreatedAt(Timestamp)
    const spotedCreatedAt = getCreatedAt(Spoted)

    const timestampText = today.getMinutes() - timeStampCreatedAt.getMinutes()
    const spotedText = (today.getTime() - spotedCreatedAt.getTime()) / (1000 * 60 * 60)

    const exAsk = Straight ? Ex1 : Ex2
    const exBid = !Straight ? Ex1 : Ex2

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
                    {AskAmount.toFixed(4)} USDT
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>ASK: </span>
                    {AskAmountUSDT.toFixed(4)} - {AskCount} ордер
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Перевода: </span>
                    {FeeUSDT}$
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Спота: </span>
                    {(SpotFee / 2).toFixed(4)}
                </p>

                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Купить: </span>
                    <a
                        className={styles["arbitrageListItem__resultBlockLinkText"]}
                        target={"_blank"}
                        href={Link1}>{exAsk.toUpperCase()}</a>
                </p>
            </div>
            <div
                className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_input']}`}>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>SELL: </span>
                    {BidAmount.toFixed(4)} USDT
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>BID: </span>
                    {BidAmountUSDT.toFixed(4)} - {BidCount} ордеров
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Комиссия Спота: </span>
                    {(SpotFee * BidPrice).toFixed(4)}$
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Продать: </span>
                    <a
                        className={styles["arbitrageListItem__resultBlockLinkText"]}
                        target={"_blank"}
                        href={Link2}>{exBid.toUpperCase()}</a>
                </p>
            </div>
            <p className={styles["arbitrageListItem__profitText"]}>
                Profit:
                <span className={styles["arbitrageListItem__profitText_blue"]}> {Profit.toFixed(4)}$</span>
            </p>
            <div className={styles["arbitrageListItem__footer"]}>
                <p className={styles["arbitrageListItem__footerText"]}>{timestampText} minutes ago</p>
                <p className={styles["arbitrageListItem__footerText"]}>Spotted: about {Math.round(spotedText)} hours
                    ago</p>
            </div>
        </div>
    );
}

export default ArbitragePageListItem;