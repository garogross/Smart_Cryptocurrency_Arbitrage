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

const filterType = (item, hash) => {
    const type = hash.slice(1)
    return (
        type === arbitrageTypes.free &&
        item.Profit <= 10 ||
        item.Kind === hash.slice(1)
    )
}

const filterExchanges = (item, exchanges) => (
    !exchanges?.length ||
    (
        exchanges.includes(item.Ex1) &&
        exchanges.includes(item.Ex2) ||
        item.Ex1.startsWith('defilama') ||
        item.Ex2.startsWith('defilama')
    )
)

const filterAmount = (item, maxAmount) => (
    !maxAmount ||
    item.AskAmountUSDT < maxAmount
)

const filterProfit = (item, profit) => (
    !profit ||
    item.Profit >= profit
)

const filterBlacklist = (item, blacklist) => (!blacklist?.find(symbol => item.Symbol.includes(symbol.toLowerCase())))

const filterBlockchain = (item, blockchains) => (
    item.Kind === arbitrageTypes.cexToCex ||
    (!blockchains?.find(chain => chain === item.Chain))
)


const filterHiddens = (item, filters) => {
    const now = new Date()
    return (
        !filters.hidden?.find(hidden => {
            const createdAt = getCreatedAt(hidden.created_at)
            createdAt.setHours(createdAt.getHours() + 4)
            createdAt.setMinutes(createdAt.getMinutes() + filters.hidden_time)
            return item.Symbol.includes(hidden.symbol.toLowerCase()) && createdAt > now
        })
    )
}


const data = [
    {
        "Symbol": "1inchusdt",
        "Ex1": "defilamaEth",
        "Link1": "https://swap.defillama.com/?chain=ethereum&from=0xdAC17F958D2ee523a2206206994597C13D831ec7&to=0x111111111117dc0aa78b770fa6a738034120c302",
        "Ex2": "mexc",
        "Link2": "https://www.mexc.com/exchange/_1INCHUSDTBID",
        "Profit": 60.64212940853324,
        "ProfitPct": 2.943103884239533,
        "BidPrice": 0.4999067757342101,
        "AskPrice": 0.48519399999999996,
        "BidAmount": 4122.062515200106,
        "BidAmountUSDT": 2060.6469813485332,
        "AskAmount": 4122.062515200106,
        "AskAmountUSDT": 2000,
        "BidCount": 2,
        "AskCount": 666,
        "HasCommonNet": true,
        "Straight": true,
        "Chain": "Ethereum",
        "Fee": 0.01,
        "FeeUSDT": 0.004999067757342101,
        "SpotFee": 0,
        "Timestamp": 1704118237,
        "Kind": "cex-dex",
        "Contract": "0x111111111117dc0aa78b770fa6a738034120c302",
        "ContractLink": "https://etherscan.io/token/0x111111111117dc0aa78b770fa6a738034120c302",
        "Spoted": 1704118237
    },
    {
        "Symbol": "arbusdt",
        "Ex1": "binance",
        "Link1": "https://www.binance.com/ru/trade/ARBUSDTBID?type=spot",
        "Ex2": "defilamaArbitrum",
        "Link2": "https://swap.defillama.com/?chain=arbitrum&from=0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9&to=0x912CE59144191C1204E64559FE8253a0e49E6548",
        "Profit": 128.69823010851565,
        "ProfitPct": 6.184583208843729,
        "BidPrice": 1.6734999999999998,
        "AskPrice": 1.570001,
        "BidAmount": 1273.8845389270452,
        "BidAmountUSDT": 2131.84577589441,
        "AskAmount": 1273.8845389270452,
        "AskAmountUSDT": 2000,
        "BidCount": 1,
        "AskCount": 666,
        "HasCommonNet": true,
        "Straight": false,
        "Chain": "Arbitrum",
        "Fee": 0.01,
        "FeeUSDT": 0.016734999999999996,
        "SpotFee": 3.13184577589441,
        "Timestamp": 1704112653,
        "Kind": "cex-dex",
        "Contract": "0x912CE59144191C1204E64559FE8253a0e49E6548",
        "ContractLink": "https://arbiscan.io/token/0x912CE59144191C1204E64559FE8253a0e49E6548",
        "Spoted": 1704112653
    },
    {
        "Symbol": "maticusdt",
        "Ex1": "defilamaPolygon",
        "Link1": "https://swap.defillama.com/?chain=polygon&from=0xc2132d05d31c914a87c6611c10748aeb04b58e8f&to=",
        "Ex2": "kucoin",
        "Link2": "https://www.kucoin.com/trade/-MATICUSDTBID",
        "Profit": 59.73559524506728,
        "ProfitPct": 2.9977153502008043,
        "BidPrice": 1.0005764333325,
        "AskPrice": 0.970582,
        "BidAmount": 2060.6192985239786,
        "BidAmountUSDT": 2061.8071081732405,
        "AskAmount": 2060.6192985239786,
        "AskAmountUSDT": 2000,
        "BidCount": 2,
        "AskCount": 666,
        "HasCommonNet": true,
        "Straight": true,
        "Chain": "Polygon",
        "Fee": 0.01,
        "FeeUSDT": 0.010005764333325,
        "SpotFee": 2.061807108173241,
        "Timestamp": 1704130232,
        "Kind": "cex-dex",
        "Contract": "",
        "ContractLink": "https://polygonscan.com/token/",
        "Spoted": 1704130232
    },
    {
        "Symbol": "bnbusdt",
        "Ex1": "binance",
        "Link1": "https://www.binance.com/ru/trade/BNBUSDTBID?type=spot",
        "Ex2": "defilamaBsc",
        "Link2": "https://swap.defillama.com/?chain=bsc&from=0x55d398326f99059ff775485246999027b3197955&to=",
        "Profit": 56.10570703566978,
        "ProfitPct": 2.9689202178788907,
        "BidPrice": 312.1,
        "AskPrice": 302.834,
        "BidAmount": 6.60427825145129,
        "BidAmountUSDT": 2061.1952422779477,
        "AskAmount": 6.60427825145129,
        "AskAmountUSDT": 2000,
        "BidCount": 1,
        "AskCount": 666,
        "HasCommonNet": true,
        "Straight": false,
        "Chain": "Binance Smart Chain",
        "Fee": 0.01,
        "FeeUSDT": 3.1210000000000004,
        "SpotFee": 2.061195242277948,
        "Timestamp": 1704133793,
        "Kind": "cex-dex",
        "Contract": "",
        "ContractLink": "https://bscscan.com/token/",
        "Spoted": 1704133793
    }

]

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
        if (!oldData.find(oldItem => oldItem.symbol === item.Symbol)) {
            dispatch(changeUserData({hidden: [...oldData, newItem]}))
        }
    }


    const filteredData = data.filter(item => (
        filterType(item, hash) &&
        filterAmount(item, filters.max_amount) &&
        filterExchanges(item, filters.exchanges) &&
        filterProfit(item, filters.profit) &&
        filterBlacklist(item, filters.blacklist) &&
        filterBlockchain(item, filters.blockchains) &&
        filterHiddens(item, filters)
    )).sort((a, b) => b.Profit - a.Profit)
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
                                    isArb={user?.subscription === subscriptionTypes.arb}
                                    isCexToDex={hash.slice(1) === arbitrageTypes.cexToDex}
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
