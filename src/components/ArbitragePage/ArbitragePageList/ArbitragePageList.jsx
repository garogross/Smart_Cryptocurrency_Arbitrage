import React, {useEffect} from 'react';
import styles from "./ArbitragePageList.module.scss"
import ArbitragePageListItem from "./ArbitragePageListItem/ArbitragePageListItem";
import {useSocket} from "../../../hooks/useSocket";
import {useDispatch, useSelector} from "react-redux";
import {setAutoRefresh, getArbitrage, requestArbitrage} from "../../../redux/action/arbitrage";
import {useLocation, useNavigate} from "react-router-dom";
import {arbitragePagePath, loginPagePath} from "../../../router/path";
import {arbitrageTypes, subscriptionTypes} from "../../../constants";
import DataLoader from "../../layout/DataLoader/DataLoader";
import {changeUserData} from "../../../redux/action/auth";
import {getCreatedAt} from "../../../utils/functions/date";

const filterType = (item, hash) => (
    hash.slice(1) === arbitrageTypes.free ||
    item.Kind === hash.slice(1)
)

const filterExchanges = (item, exchanges) => (
    !exchanges?.length ||
    (exchanges.includes(item.Ex1) ||
        exchanges.includes(item.Ex2))
)

const filterProfit = (item, profit) => (
    !profit ||
    item.Profit >= profit
)

const filterBlacklist = (item, blacklist) => (!blacklist?.find(symbol => item.Symbol.includes(symbol.toLowerCase())))


const filterHiddens = (item, filters) => (
    !filters.hidden?.find(hidden => {
        const now = new Date()
        const createdAt = getCreatedAt(hidden.created_at)
        createdAt.setHours(createdAt.getHours()+4)
        createdAt.setMinutes(createdAt.getMinutes() + filters.hidden_time)
        return item.Symbol.includes(hidden.symbol.toLowerCase()) && createdAt > now
    })
)

function ArbitragePageList() {
    const {hash} = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const data = useSelector(state => state.arbitrage.data)
    const filters = useSelector(state => state.arbitrage.filters)
    const loading = useSelector(state => state.arbitrage.getLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAutoRefresh())

        if (!hash) {
            navigate(`${arbitragePagePath}#free`)
        }
    }, []);
    useSocket(
        (payload) => dispatch(getArbitrage(payload)),
        () => dispatch(requestArbitrage())
    )

    const onAddToBlackList = (symbol) => {
        dispatch(changeUserData({blacklist: [...filters.blacklist, symbol]}))
    }


    const onAddToHidden = (item) => {
        const newItem = {
            symbol: item.Symbol,
            ex1: item.Ex1,
            ex2: item.Ex2,
        }
        const oldData = filters.hidden || []
        if(!oldData.find(oldItem => oldItem.symbol === item.Symbol)) {
            dispatch(changeUserData({hidden: [...oldData, newItem]}))
        }
    }



    const filteredData = data.filter(item => (
        filterType(item, hash) &&
        filterExchanges(item, filters.exchanges) &&
        filterProfit(item, filters.profit) &&
        filterBlacklist(item, filters.blacklist) &&
        filterHiddens(item,filters)
    ))


    return (

        <div className={styles["arbitrageList"]}>
            {
                filteredData.length ?
                    <div className={styles["arbitrageList__container"]}>
                        {
                            filteredData.map((item, index) => (
                                <ArbitragePageListItem
                                    key={index}
                                    onAddToBlackList={onAddToBlackList}
                                    onAddToHidden={onAddToHidden}
                                    isArb={user.subscription === subscriptionTypes.arb}
                                    {...item}
                                />
                            ))
                        }
                    </div> : null
            }
            <DataLoader loading={loading} isEmpty={!filteredData.length}/>
        </div>
    );
}

export default ArbitragePageList;