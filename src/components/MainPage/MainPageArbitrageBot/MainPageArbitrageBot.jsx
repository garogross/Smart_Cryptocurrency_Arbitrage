import React from 'react';
import styles from "./MainPageArbitrageBot.module.scss"
import {dexBotImage, dexBotImageWebp, dexBotMobImage} from "../../../assets/images";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";

function MainPageArbitrageBot() {
    return (
            <div className={styles["arbitrageBot"]}>
                <h2 className={`${styles["arbitrageBot__title"]} titleTxt`}>
                    <span className={'blueText'}>DEX    </span>
                    Arbitrage Bot</h2>
                <p className={`${styles["arbitrageBot__contentText"]} contentTxt`}>Арбитраж DeX - это покупка токенов на одной децентрализованной
                    бирже (DeX) и их немедленная продажа на другой по более высокой цене. Тем
                    самым мы получаем высокочастотный криптотрейдинг, сэндвич-трейдинг и MEV.</p>
                <ImageWebp
                    srcSet={dexBotImageWebp}
                    src={dexBotImage}
                    alt="Bot"
                    className={`${styles["arbitrageBot__image"]} ${styles["arbitrageBot__image_desk"]}`}
                />
                <ImageWebp
                    src={dexBotMobImage}
                    alt="Bot"
                    className={`${styles["arbitrageBot__image"]} ${styles["arbitrageBot__image_mob"]}`}
                />
            </div>
    );
}

export default MainPageArbitrageBot;