import React from 'react';
import Svg from "../../../layout/Svg/Svg";
import {crossIcon, eyeIcon} from "../../../../assets/svg";
import styles from "./ArbitragePageListItem.module.scss"

function ArbitragePageListItem() {
    return (
        <div>
            <div className={styles["arbitrageListItem"]}>
                <div className={styles["arbitrageListItem__header"]}>
                    <h5 className={styles["arbitrageListItem__title"]}>ARBGPT</h5>
                    <div className={styles["arbitrageListItem__headerBtns"]}>
                        <button className={styles["arbitrageListItem__hiderBtn"]}>
                            <Svg className={styles["arbitrageListItem__hideIcon"]} id={eyeIcon}/>
                        </button>
                        <button className={styles["arbitrageListItem__hiderBtn"]}>
                            <Svg className={styles["arbitrageListItem__crossIcon"]} id={crossIcon}/>
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_output']}`}>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_green"]}>BUY: </span>
                        8550 USDT
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_green"]}>ASK: </span>
                        0.677 - 1 ордер
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_green"]}>Сеть: </span>
                        ERC-20
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Перевода: </span>
                        4.74$
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_green"]}>Комиссия Спота: </span>
                        0
                    </p>
                </div>
                <div
                    className={`${styles["arbitrageListItem__resultBlock"]} ${styles['arbitrageListItem__resultBlock_input']}`}>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_red"]}>SELL: </span>
                        8860 USDT
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_red"]}>BID: </span>
                        0.684 - 10 ордеров
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_red"]}>Сеть: </span>
                        ERC-20
                    </p>
                    <p className={styles["arbitrageListItem__resultBlockText"]}>
                        <span className={styles["arbitrageListItem__resultBlockText_red"]}>Комиссия Спота: </span>
                        $11.287$
                    </p>
                </div>
                <p className={styles["arbitrageListItem__profitText"]}>
                    Profit:
                    <span className={styles["arbitrageListItem__profitText_blue"]}> 293.98$</span>
                </p>
                <p className={styles["arbitrageListItem__profitText"]}>
                    Profit with Setting:
                    <span className={styles["arbitrageListItem__profitText_blue"]}> 340$</span>
                </p>
                <div className={styles["arbitrageListItem__footer"]}>
                    <p className={styles["arbitrageListItem__footerText"]}>10 minutes ago</p>
                    <p className={styles["arbitrageListItem__footerText"]}>Spotted: about 6 hours ago</p>
                </div>
            </div>
        </div>
    );
}

export default ArbitragePageListItem;