import React from 'react';
import Svg from "../../../layout/Svg/Svg";
import {crossIcon, eyeIcon} from "../../../../assets/svg";
import styles from "./ArbitragePageListItem.module.scss"
import {getCreatedAt} from "../../../../utils/functions/date";


const getTimeDifference = (unixDate) => {
    const today = new Date()
    const date = getCreatedAt(unixDate)
    return Math.round((today.getTime() - date.getTime()) / 1000)
}


const exchangeColors = [
    {
        ex: "defilamaEth",
        color: "#003ded",
        name: "Ethereum"
    },
    {
        ex: "defilamaPolygon",
        color: "#843FE1",
        name: "Polygon"
    },
    {
        ex: "defilamaBsc",
        color: "#ffc728",
        name: "BSC"
    },
    {
        ex: "defilamaArbitrum",
        color: "#fff",
        colorText: "#5871F2",
        name: "Arbitrum"
    },
]

const exText = (ex) => {
    if(ex.startsWith('defilama')) return  "SWAP"
    else if(ex.toLowerCase() === "okex") return "OKX"
    else return ex.toUpperCase()
}

function ArbitragePageListItem({
                                   AskCount,
                                   AskAmount,
                                   BidAmount,
                                   AskAmountUSDT,
                                   BidAmountUSDT,
                                   BidPrice,
                                   AskPrice,
                                   BidCount,
                                   Chain,
                                   FeeUSDT,
                                   Profit,
                                   SpotFee,
                                   Symbol,
                                   onAddToBlackList,
                                   onAddToHidden,
                                   Ex1,
                                   Ex2,
                                   isArb,
                                   Link1,
                                   Link2,
                                   Straight,
                                   Spoted,
                                   isCexToDex,
                                   ProfitPct,
                                   Contract,
                                   ContractLink
                               }) {


    const spotedText = getTimeDifference(Spoted)

    let exAsk = Straight ? Ex1 : Ex2
    let exBid = !Straight ? Ex1 : Ex2
    const linkAsk = Straight ? Link1 : Link2
    const linkBid = !Straight ? Link1 : Link2


    const setOrderText = (amount) => {
        const types = [
            [[1], 'ордер'],
            [[2, 3, 4, 5], 'ордера'],
        ]
        const type = types.find(item => item[0].includes(amount))
        return type ? type[1] : 'ордеров'
    }


    const setDateText = (spotedAt) => {
        const types = [
            [24 * 60 * 60, "more than a day ago"],
            [60 * 60, `${Math.round(spotedAt / 60 / 60)} hour ago`],
            [60, `${Math.round(spotedAt / 60 / 60)} min. ago`],
        ]

        const type = types.find(item => spotedAt >= item[0])

        return type ? type[1] : 'a few seconds ago'
    }

    const exchangeItem = exchangeColors
        .find(item => isCexToDex &&
            item.ex === exBid ||
            item.ex === exAsk
        )

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
                    {AskAmount.toFixed(4)} ({AskAmountUSDT.toFixed(4)} USDT)
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>ASK: </span>
                    {AskPrice.toFixed(4)} - {AskCount} {setOrderText(AskCount)}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Перевода: </span>
                    {FeeUSDT.toFixed(4)}$
                </p>

                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_green"]}>Купить: </span>
                    <a
                        className={styles["arbitrageListItem__resultBlockLinkText"]}
                        target={"_blank"}
                        rel="noreferrer"
                        href={linkAsk}>{exText(exAsk)}</a>
                </p>
            </div>
            <div
                className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_input']}`}>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>SELL: </span>
                    {BidAmount.toFixed(4)} ({BidAmountUSDT.toFixed(4)} USDT)
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>BID: </span>
                    {BidPrice.toFixed(4)} - {BidCount} {setOrderText(BidCount)}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Сеть: </span>
                    {Chain}
                </p>
                <p className={styles["arbitrageListItem__resultBlockText"]}>
                    <span className={styles["arbitrageListItem__resultBlockText_red"]}>Продать: </span>
                    <a
                        className={styles["arbitrageListItem__resultBlockLinkText"]}
                        target={"_blank"}
                        rel="noreferrer"
                        href={linkBid}>{exText(exBid)}</a>
                </p>

                {
                    isCexToDex ?
                        <p className={styles["arbitrageListItem__resultBlockText"]}>
                            <span className={styles["arbitrageListItem__resultBlockText_red"]}>Адрес Контракта: </span>
                            <a
                                className={styles["arbitrageListItem__resultBlockLinkText"]}
                                target={"_blank"}
                                rel="noreferrer"
                                href={ContractLink}>{Contract}</a>
                        </p> : null
                }

                {
                    exchangeItem ?
                        <div
                            className={styles["arbitrageListItem__exhcangeBlock"]}
                            style={{
                                backgroundColor: exchangeItem.color
                            }}
                        >
                            <h6
                                className={styles["arbitrageListItem__exhcangeBlockText"]}
                                style={{
                                    color: exchangeItem.colorText || "#fff"
                                }}
                            >{exchangeItem.name}</h6>
                        </div> : null
                }
            </div>
            <p className={styles["arbitrageListItem__profitText"]}>
                Общая комиссия:
                <span className={styles["arbitrageListItem__profitText_blue"]}> {SpotFee.toFixed(4)}$</span>
            </p>
            <p className={styles["arbitrageListItem__profitText"]}>
                Profit:
                <span
                    className={styles["arbitrageListItem__profitText_blue"]}> {Profit.toFixed(4)}$ ({ProfitPct.toFixed(4)}%)</span>
            </p>
            <div className={styles["arbitrageListItem__footer"]}>
                <p className={styles["arbitrageListItem__footerText"]}>Spotted: {setDateText(spotedText)}</p>
            </div>
        </div>
    );
}

export default ArbitragePageListItem;