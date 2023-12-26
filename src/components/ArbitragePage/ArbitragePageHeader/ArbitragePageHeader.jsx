import React, {useState} from 'react';
import {eyeIcon, refreshIcon} from "../../../assets/svg";
import Svg from "../../layout/Svg/Svg";
import styles from "./ArbitragePageHeader.module.scss"
import ArbitragePageHiddenItemsModal from "./ArbitragePageHiddenItemsModal/ArbitragePageHiddenItemsModal";
import ArbitragePageFilterModal from "./ArbitragePageFilterModal/ArbitragePageFilterModal";

const data = [
    {
        id: 1,
        name: "AIDOGE"
    },
    {
        id: 2,
        name: "BCMC"
    },
    {
        id: 3,
        name: "BCMC"
    },
    {
        id: 4,
        name: "KST"
    },
    {
        id: 6,
        name: "AIDOGE"
    },
    {
        id: 7,
        name: "AIDOGE"
    },
    {
        id: 8,
        name: "AIDOGE"
    },
    {
        id: 9,
        name: "AIDOGE"
    },
]

function ArbitragePageHeader() {
    const [isBlackListModalOpened,setIsBlackListModalOpened] = useState(false)
    const [isHiddenItemsModalOpened,setIsHiddenItemsModalOpened] = useState(false)
    const [isAutoRefreshOn,setIsAutoRefreshOn] = useState(false)
    const [isFilterModalOpened,setIsFilterModalOpened] = useState(false)

    const openBlackListModal = () => setIsBlackListModalOpened(true)
    const closeBlackListModal = () => setIsBlackListModalOpened(false)
    const openHiddenItemsModal = () => setIsHiddenItemsModalOpened(true)
    const closeHiddenItemsModal = () => setIsHiddenItemsModalOpened(false)
    const openFilterModal = () => setIsFilterModalOpened(true)
    const closeFilterModal = () => setIsFilterModalOpened(false)
    const toggleAutoRefresh = () => setIsAutoRefreshOn(prevState => !prevState)



    return (
            <div className={styles["arbitrageHeader"]}>
                <h6 className={`${styles["arbitrageHeader__title"]} pageRouteTitle`}>Главная > Arbitrage > CEX — CEX Arbitrage</h6>
                <div className={styles["arbitrageHeader__options"]}>
                    <div className={styles["arbitrageHeader__blacklistOptions"]}>
                        <button
                            className={styles["arbitrageHeader__btn"]}
                            onClick={openBlackListModal}
                        >Blacklist</button>
                        <button
                            className={styles["arbitrageHeader__eyeBtn"]}
                            onClick={openHiddenItemsModal}
                        >
                            <Svg className={styles["arbitrageHeader__eyeIcon"]} id={eyeIcon}/>
                        </button>
                    </div>
                    <div className={styles["arbitrageHeader__blacklistFilterOptions"]}>
                        <button
                            onClick={openFilterModal}
                            className={styles["arbitrageHeader__btn"]}
                        >Filters</button>
                        <button
                            className={`${styles["arbitrageHeader__btn"]} ${!isAutoRefreshOn ?  styles["arbitrageHeader__btn__disabled"] : ""}`}
                            onClick={toggleAutoRefresh}
                        >
                            Auto Refresh {isAutoRefreshOn ? 'Off' : 'On'}
                            <Svg className={styles["arbitrageHeader__refreshIcon"]} id={refreshIcon}/>
                        </button>
                    </div>
                </div>
                <ArbitragePageHiddenItemsModal
                    show={isBlackListModalOpened}
                    onClose={closeBlackListModal}
                    title={'Blacklist'}
                    data={data}
                    onRemove={(id) => console.dir(id)}
                />
                <ArbitragePageHiddenItemsModal
                    show={isHiddenItemsModalOpened}
                    onClose={closeHiddenItemsModal}
                    title={'Скрытые'}
                    data={data}
                    onRemove={(id) => console.dir(id)}
                />
                <ArbitragePageFilterModal show={isFilterModalOpened} onClose={closeFilterModal}/>
            </div>
    );
}

export default ArbitragePageHeader;