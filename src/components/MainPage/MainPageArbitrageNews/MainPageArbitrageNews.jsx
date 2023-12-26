import React from 'react';
import Svg from "../../layout/Svg/Svg";

import styles from "./MainPageArbitrageNews.module.scss"
import {newsDak1Image, newsDark2Image, newsLight1Image, newsLight2Image} from "../../../assets/images";
import {arrowWithLineIcon, successIcon} from "../../../assets/svg";
import AbsoluteBlock from "../../global/AbsoluteBlock/AbsoluteBlock";

function MainPageArbitrageNews() {
    return (
        <div>
            <div className={styles["arbitrageNews"]}>
                <h2 className={`${styles["arbitrageNews__title"]} titleTxt`}>Arbitration <span
                    className={'blueText'}>News</span></h2>
                <p className={`${styles["arbitrageNews__subText"]} contentTxt`}>Любая новость рождает возможность.
                    Начиная от Валотильности, листинга
                    новых токенов, заканчивая рассветом/крахом многих проектов.</p>
                <div className={styles["arbitrageNews__topBlock"]}>
                    <div className={`${styles["arbitrageNews__topBlockImages"]} ${styles['arbitrageNews__blurBox']}`}>
                        <img src={newsLight1Image} alt="screenshot" className={styles["arbitrageNews__topBlockImage"]}/>
                        <img src={newsLight2Image} alt="screenshot" className={styles["arbitrageNews__topBlockImage"]}/>
                        <div className={styles["arbitrageNews__linearBox"]}></div>
                    </div>
                    <div className={styles["arbitrageNews__topBlockText"]}>
                        <h6 className={`${styles["arbitrageNews__topBlockSubtitle"]} subtitleTxt`}>Пример одного
                            тестового круга на новости токена
                            RLTM.</h6>
                        <h3 className={styles["arbitrageNews__topBlockTitle"]}>2 ноября взломали
                            проект RLTM.</h3>
                        <div className={styles["arbitrageNews__topBlockInstructions"]}>
                            <div className={styles["arbitrageNews__topBlockInstructionsSuccessBox"]}>
                                <Svg
                                    id={successIcon}
                                    className={styles["arbitrageNews__topBlockInstructionsSuccessIcon"]}
                                />
                            </div>
                            <p className={`${styles["arbitrageNews__topBlockInstructionsText"]} contentTxt`}>
                                Данный арбитраж можно в подробностях увидеть на Youtube канале: Бескровный
                                С данной сделки удалось заработать 3200$ / 1 час арбитража!
                            </p>
                        </div>
                        <div className={styles["arbitrageNews__topBlockInstructions"]}>
                            <div className={styles["arbitrageNews__topBlockInstructionsSuccessBox"]}>
                                <Svg
                                    id={successIcon}
                                    className={styles["arbitrageNews__topBlockInstructionsSuccessIcon"]}
                                />
                                <Svg
                                    id={arrowWithLineIcon}
                                    className={styles["arbitrageNews__topBlockInstructionsArrowIcon"]}
                                />
                            </div>
                            <p className={`${styles["arbitrageNews__topBlockInstructionsText"]} contentTxt`}>
                                Взломщики вывели токены на DEX в сети Polygon и начали продавать лить цену токена!
                                В связи с чем образовалось Арбитражное окно
                                в 200%+
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles["arbitrageNews__bottomBlock"]}>
                    <div
                        className={`${styles["arbitrageNews__bottomBlockContainer"]} ${styles["arbitrageNews__blurBox"]}`}>
                        <AbsoluteBlock
                            className={styles["arbitrageNews__absoluteBlock"]}
                        >DEX</AbsoluteBlock>
                        <div className={`${styles["arbitrageNews__linearBox"]} ${styles["arbitrageNews__linearBox_bottom"]}`}></div>

                        <img src={newsDak1Image} alt="screenshot"
                             className={`${styles["arbitrageNews__bottomBlockImg"]} ${styles["arbitrageNews__bottomBlockImg_left"]}`}/>
                    </div>
                    <div
                        className={`${styles["arbitrageNews__bottomBlockContainer"]} ${styles["arbitrageNews__blurBox"]}`}>
                        <div className={`${styles["arbitrageNews__linearBox"]} ${styles["arbitrageNews__linearBox_bottom"]}`}></div>

                        <AbsoluteBlock
                            isRed={true}
                            className={styles["arbitrageNews__absoluteBlock"]}
                        >KuCoin</AbsoluteBlock>
                        <img src={newsDark2Image} alt="screenshot"
                             className={`${styles["arbitrageNews__bottomBlockImg"]} ${styles["arbitrageNews__bottomBlockImg_right"]}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageArbitrageNews;