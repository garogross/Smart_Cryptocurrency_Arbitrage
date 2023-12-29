import React, {useState} from 'react';
import {eyeIcon, refreshIcon} from "../../../assets/svg";
import Svg from "../../layout/Svg/Svg";
import styles from "./ArbitragePageHeader.module.scss"
import ArbitragePageHiddenItemsModal from "./ArbitragePageHiddenItemsModal/ArbitragePageHiddenItemsModal";
import ArbitragePageFilterModal from "./ArbitragePageFilterModal/ArbitragePageFilterModal";
import {useDispatch, useSelector} from "react-redux";
import {setAutoRefresh} from "../../../redux/action/arbitrage";
import {changeUserData} from "../../../redux/action/auth";


function ArbitragePageHeader() {
    const dispatch = useDispatch()
    const autoRefresh = useSelector(state => state.arbitrage.autoRefresh)
    const user = useSelector(state => state.auth.user)
    const filters = useSelector(state => state.arbitrage.filters)

    const [isBlackListModalOpened, setIsBlackListModalOpened] = useState(false)
    const [isHiddenItemsModalOpened, setIsHiddenItemsModalOpened] = useState(false)
    const [isFilterModalOpened, setIsFilterModalOpened] = useState(false)

    const openBlackListModal = () => setIsBlackListModalOpened(true)
    const closeBlackListModal = () => setIsBlackListModalOpened(false)
    const openHiddenItemsModal = () => setIsHiddenItemsModalOpened(true)
    const closeHiddenItemsModal = () => setIsHiddenItemsModalOpened(false)
    const openFilterModal = () => setIsFilterModalOpened(true)
    const closeFilterModal = () => setIsFilterModalOpened(false)


    const onRemoveBlackListItem = (item) => {
        dispatch(changeUserData({blacklist: filters.blacklist.filter(filterItem => filterItem !== item)}))
    }

    const onRemoveHiddenItem = (item) => {
        dispatch(changeUserData({hidden: filters.hidden?.filter(filterItem => filterItem.symbol !== item)}))
    }

    return (
        <div className={styles["arbitrageHeader"]}>
            <h6 className={`${styles["arbitrageHeader__title"]} pageRouteTitle`}>Главная > Arbitrage > CEX — CEX
                Arbitrage</h6>
            <div className={styles["arbitrageHeader__options"]}>
                <div className={styles["arbitrageHeader__blacklistOptions"]}>
                    <button
                        className={styles["arbitrageHeader__btn"]}
                        onClick={openBlackListModal}
                    >Blacklist
                    </button>
                    <button
                        className={styles["arbitrageHeader__eyeBtn"]}
                        onClick={openHiddenItemsModal}
                    >
                        <Svg className={styles["arbitrageHeader__eyeIcon"]} id={eyeIcon}/>
                    </button>
                </div>
                <div className={styles["arbitrageHeader__blacklistFilterOptions"]}>
                    <button
                        disabled={!user}
                        onClick={openFilterModal}
                        className={styles["arbitrageHeader__btn"]}
                    >Filters
                    </button>
                    <button
                        className={`${styles["arbitrageHeader__btn"]} ${!autoRefresh ? styles["arbitrageHeader__btn__disabled"] : ""}`}
                        onClick={() => dispatch(setAutoRefresh(true))}
                    >
                        Auto Refresh {autoRefresh ? 'Off' : 'On'}
                        <Svg className={styles["arbitrageHeader__refreshIcon"]} id={refreshIcon}/>
                    </button>
                </div>
            </div>
            <ArbitragePageHiddenItemsModal
                show={isBlackListModalOpened}
                onClose={closeBlackListModal}
                title={'Blacklist'}
                data={filters.blacklist || []}
                onRemove={onRemoveBlackListItem}
            />
            <ArbitragePageHiddenItemsModal
                show={isHiddenItemsModalOpened}
                onClose={closeHiddenItemsModal}
                title={'Скрытые'}
                data={filters.hidden?.map(item => item.symbol) || []}
                onRemove={onRemoveHiddenItem}
            />
            {user ?
                <ArbitragePageFilterModal
                    show={isFilterModalOpened}
                    onClose={closeFilterModal}
                />
                : null
            }
        </div>
    );
}

export default ArbitragePageHeader;