import React from 'react';
import styles from "./MainPageArbitrageScanner.module.scss"
import {
    cexArbitrageDarkImage, cexArbitrageDarkImageWebp,
    cexArbitrageLightImage, cexArbitrageLightImageWebp,
    dexArbitrageDarkImage, dexArbitrageDarkImageWebp,
    dexArbitrageLightImage, dexArbitrageLightImageWebp
} from "../../../assets/images";
import AbsoluteBlock from "../../global/AbsoluteBlock/AbsoluteBlock";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";

function MainPageArbitrageScanner() {


    return (
        <div className={styles["arbitrageScanner"]}>
            <div className={`${styles["arbitrageScanner__block"]} ${styles["arbitrageScanner__block_dex"]}`}>
                <AbsoluteBlock
                    isRed={true}
                    className={`${styles["arbitrageScanner__dexRedAbsoluteBlock"]} ${styles["arbitrageScanner__deskAbsoluteBlock"]}`}
                >CEX</AbsoluteBlock>
                <AbsoluteBlock
                    className={`${styles["arbitrageScanner__dexGreenAbsoluteBlock"]} ${styles["arbitrageScanner__deskAbsoluteBlock"]}`}
                >DEX</AbsoluteBlock>
                <div className={styles["arbitrageScanner__dexImages"]}>
                    <div className={styles['arbitrageScanner__mobAbsoluteBlockWrapper']}>
                        <AbsoluteBlock
                            className={styles["arbitrageScanner__mobAbsoluteBlock"]}
                        >DEX</AbsoluteBlock>
                    </div>
                    <ImageWebp
                        pictureClass={
                            `${styles["arbitrageScanner__image"]} ` +
                            `${styles["arbitrageScanner__lightImage"]} `
                        }
                        srcSet={dexArbitrageLightImageWebp}
                        src={dexArbitrageLightImage}
                        alt="market"
                    />
                    <div className={styles['arbitrageScanner__mobAbsoluteBlockWrapper']}>
                        <AbsoluteBlock
                            isRed={true}
                            className={styles["arbitrageScanner__mobAbsoluteBlock"]}
                        >CEX</AbsoluteBlock>
                    </div>
                    <ImageWebp
                        srcSet={dexArbitrageDarkImageWebp}
                        src={dexArbitrageDarkImage}
                        alt="orders"
                        pictureClass={
                            `${styles["arbitrageScanner__image"]} ` +
                            `${styles["arbitrageScanner__darkImage"]} ` +
                            `${styles["arbitrageScanner__darkImage_dex"]}`
                        }/>
                </div>
                <div className={styles["arbitrageScanner__dexTextBlock"]}>
                    <h5 className={`${styles["arbitrageScanner__subtitle"]} subtitleTxt`}>CEX - DEX Arbitrage
                        Scanner</h5>
                    <h3 className={styles["arbitrageScanner__title"]}>Поиск арбитражных
                        возможностей между CEX и DEX</h3>
                    <p className={`${styles["arbitrageScanner__contentTxt"]} contentTxt`}>{'Наши сканеры CEX <-> DEX / CEX <-> CEX Arbitrage работают 24 часа в сутки 7 дней в неделю, чтобы найти потенциальные возможности для арбитража!'}</p>
                </div>
            </div>

            <div className={`${styles["arbitrageScanner__block"]} ${styles["arbitrageScanner__block_cex"]}`}>
                <div className={styles["arbitrageScanner__cexTextBlock"]}>
                    <AbsoluteBlock
                        isRed={true}
                        className={`${styles["arbitrageScanner__cexRedAbsoluteBlock"]} ${styles["arbitrageScanner__deskAbsoluteBlock"]}`}
                    >KuCoin</AbsoluteBlock>
                    <AbsoluteBlock
                        className={`${styles["arbitrageScanner__cexGreenAbsoluteBlock"]} ${styles["arbitrageScanner__deskAbsoluteBlock"]}`}
                    >GATE</AbsoluteBlock>
                    <h5 className={`${styles["arbitrageScanner__subtitle"]} subtitleTxt`}>CEX - CEX Arbitrage
                        Scanner</h5>
                    <h3 className={styles["arbitrageScanner__title"]}>CEX Arbitrage Bot</h3>
                    <p className={`${styles["arbitrageScanner__contentTxt"]} contentTxt`}>CEX Арбитраж — торговый
                        процесс, использующий
                        разницу в ценах на разных централизованный (CEX) биржах.</p>
                </div>
                <div className={styles["arbitrageScanner__cexImages"]}>
                    <div className={styles['arbitrageScanner__mobAbsoluteBlockWrapper']}>
                        <AbsoluteBlock
                            className={styles["arbitrageScanner__mobAbsoluteBlock"]}
                        >GATE</AbsoluteBlock>
                    </div>
                    <ImageWebp
                        srcSet={cexArbitrageLightImageWebp}
                        src={cexArbitrageLightImage}
                        alt="orders"
                         pictureClass={
                             `${styles["arbitrageScanner__image"]} ` +
                             `${styles["arbitrageScanner__lightImage"]} `
                         }
                    />
                    <div className={styles['arbitrageScanner__mobAbsoluteBlockWrapper']}>
                        <AbsoluteBlock
                            isRed={true}
                            className={styles["arbitrageScanner__mobAbsoluteBlock"]}
                        >KuCoin</AbsoluteBlock>
                    </div>
                    <ImageWebp
                        srcSet={cexArbitrageDarkImageWebp}
                        src={cexArbitrageDarkImage}
                        alt="orders"
                        pictureClass={
                            `${styles["arbitrageScanner__image"]} ` +
                            `${styles["arbitrageScanner__darkImage"]} ` +
                            `${styles["arbitrageScanner__darkImage_cex"]} `
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPageArbitrageScanner;