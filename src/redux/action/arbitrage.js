import {
    GET_ARBITRAGE_ERROR, GET_ARBITRAGE_EXCHANGES,
    GET_ARBITRAGE_LOADING_START,
    GET_ARBITRAGE_SUCCESS,
    SET_ARBITRAGE_AUTO_REFRESH, TOGGLE_ARBITRAGE_AUTO_REFRESH
} from "../types";
import {fetchRequest, getArbitrageUrl} from "./fetchTools";
import {lsProps} from "../../utils/cookies";
import {getLSItem, setLSItem} from "../../utils/functions/localStorage";


export const getArbitrage = (payload) => dispatch => {
    dispatch({type: GET_ARBITRAGE_SUCCESS, payload})
    dispatch(getArbitrageExchanges(payload))
}

export const requestArbitrage = () => async (dispatch) => {
    dispatch({type: GET_ARBITRAGE_LOADING_START})
    try {
        const {Data: data} = await fetchRequest(getArbitrageUrl)
            dispatch(getArbitrage(data || []))
    } catch (err) {
        dispatch({type: GET_ARBITRAGE_ERROR})
    }
}

export const getArbitrageExchanges = (data) => (dispatch, getState) => {
    const exchanges = getState().arbitrage.exchanges
    if (!exchanges?.length) {
        const payload= [...new Set(data.map(item => [item.Ex1, item.Ex2]).flat())]
        dispatch({type: GET_ARBITRAGE_EXCHANGES, payload})
    }
}

export const setAutoRefresh = (isToggle) => (dispatch) => {
    const autoRefresh = getLSItem(lsProps.autoRefresh,true)
    if (isToggle) {
        dispatch({type: TOGGLE_ARBITRAGE_AUTO_REFRESH})
        setLSItem(lsProps.autoRefresh, !autoRefresh)
    } else {
        const payload = autoRefresh === undefined ? true : autoRefresh
        if (payload !== autoRefresh) setLSItem(lsProps.autoRefresh, payload)
        dispatch({type: SET_ARBITRAGE_AUTO_REFRESH, payload})
    }
}