import React, {useEffect, useRef, useState} from 'react';
import {eyeIcon, refreshIcon} from "../../../assets/svg";
import Svg from "../../layout/Svg/Svg";
import styles from "./ArbitragePageHeader.module.scss"
import ArbitragePageHiddenItemsModal from "./ArbitragePageHiddenItemsModal/ArbitragePageHiddenItemsModal";
import ArbitragePageFilterModal from "./ArbitragePageFilterModal/ArbitragePageFilterModal";
import {useDispatch, useSelector} from "react-redux";
import {setAutoRefresh} from "../../../redux/action/arbitrage";
import {changeUserData} from "../../../redux/action/auth";
import {getCreatedAt} from "../../../utils/functions/date";
import ArbitrageFilterNotPopup from "./ArbitrageFilterNotPopup/ArbitrageFilterNotPopup";
import {useLocation} from "react-router-dom";


function ArbitragePageHeader() {
    const dispatch = useDispatch()
    const {hash} = useLocation()
    const autoRefresh = useSelector(state => state.arbitrage.autoRefresh)
    const user = useSelector(state => state.auth.user)
    const filters = useSelector(state => state.arbitrage.filters)

    const [isBlackListModalOpened, setIsBlackListModalOpened] = useState(false)
    const [isHiddenItemsModalOpened, setIsHiddenItemsModalOpened] = useState(false)
    const [isFilterModalOpened, setIsFilterModalOpened] = useState(false)
    const [isFilterNotModalOpened, setIsFilterNotModalOpened] = useState(false)
    const filterNotModalIntervalRef = useRef(null)

    const openBlackListModal = () => setIsBlackListModalOpened(true)
    const closeBlackListModal = () => setIsBlackListModalOpened(false)
    const openHiddenItemsModal = () => setIsHiddenItemsModalOpened(true)
    const closeHiddenItemsModal = () => setIsHiddenItemsModalOpened(false)
    const openFilterModal = () => setIsFilterModalOpened(true)
    const closeFilterModal = (isCreated) => {
        setIsFilterModalOpened(false)
        if(isCreated && typeof isCreated == "boolean") openFilterNotModal()
    }
    const openFilterNotModal = () => setIsFilterNotModalOpened(true)
    const closeFilterNotModal = () => setIsFilterNotModalOpened(false)

    useEffect(() => {
        let interval = null
        if (filters.hidden && filters.hidden_time) {
            interval = setInterval(() => {
                const hidden = filters.hidden.filter(hidden => {
                    const now = new Date()
                    const createdAt = getCreatedAt(hidden.created_at)
                    createdAt.setHours(createdAt.getHours() + 4)
                    createdAt.setMinutes(createdAt.getMinutes() + filters.hidden)
                    return createdAt > now
                })
                if (hidden.length !== filters.hidden.length) {
                    dispatch(changeUserData({hidden}))
                }
            }, filters.hidden_time * 60 * 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [filters]);

    useEffect(() => {
        if (isFilterNotModalOpened) {
            filterNotModalIntervalRef.current = setTimeout(() => {
                closeFilterNotModal()
            }, 2000)
        } else {
            if(filterNotModalIntervalRef.current) clearInterval(filterNotModalIntervalRef.current)
        }
    }, [isFilterNotModalOpened]);


    const onRemoveBlackListItem = (item) => {
        dispatch(changeUserData({blacklist: filters.blacklist.filter(filterItem => filterItem !== item)}))
    }

    const onRemoveHiddenItem = (item) => {
        dispatch(changeUserData({hidden: filters.hidden?.filter(filterItem => filterItem.symbol !== item)}))
    }

    return (
        <div className={styles["arbitrageHeader"]}>
            <h6 className={`${styles["arbitrageHeader__title"]} pageRouteTitle`}>
                Главная > Arbitrage > {hash ? `${hash.slice(1).replace('-', " - ").toUpperCase()} Arbitrage` : ""}
            </h6>
            <div className={styles["arbitrageHeader__options"]}>
                <div className={styles["arbitrageHeader__blacklistOptions"]}>
                    <button
                        className={styles["arbitrageHeader__btn"]}
                        onClick={openBlackListModal}
                    >Blacklist
                    </button>
                    <button
                        className={`${styles["arbitrageHeader__eyeBtn"]} ${styles["arbitrageHeader__eyeBtn_desk"]}`}
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
                <button
                    className={`${styles["arbitrageHeader__eyeBtn"]} ${styles["arbitrageHeader__eyeBtn_mob"]}`}
                    onClick={openHiddenItemsModal}
                >
                    <Svg className={styles["arbitrageHeader__eyeIcon"]} id={eyeIcon}/>
                </button>
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
            <ArbitrageFilterNotPopup
                show={isFilterNotModalOpened}
                onClose={closeFilterNotModal}
            />
        </div>
    );
}

export default ArbitragePageHeader;