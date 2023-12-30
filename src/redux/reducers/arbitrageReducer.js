import {
    GET_ARBITRAGE_ERROR, GET_ARBITRAGE_EXCHANGES,
    GET_ARBITRAGE_LOADING_START,
    GET_ARBITRAGE_SUCCESS,
    SET_ARBITRAGE_AUTO_REFRESH, SET_ARBITRAGE_FILTERS, TOGGLE_ARBITRAGE_AUTO_REFRESH
} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null,
    autoRefresh: false,
    exchanges: [],
    filters: {
        min_amount:0,
        max_amount:0,
        profit:0,
        hidden:[],
        blacklist:[],
        exchanges:[],
        hidden_time:0,
        blockchains: [],
    }
}


export const arbitrageReducer = (state = initialState,action) => {
    const {type,payload} = action

    switch (type) {
        case GET_ARBITRAGE_SUCCESS: {
            return {
                ...state,
                data: payload,
                getLoading: false
            }
        }
        case GET_ARBITRAGE_LOADING_START: {
            return {
                ...state,
                getLoading: true,
                getError: null
            }
        }
        case GET_ARBITRAGE_ERROR: {
            return {
                ...state,
                getError: payload,
                getLoading: false
            }
        }
        case SET_ARBITRAGE_AUTO_REFRESH: {
            return {
                ...state,
                autoRefresh: payload
            }
        }
        case TOGGLE_ARBITRAGE_AUTO_REFRESH: {
            return {
                ...state,
                autoRefresh: !state.autoRefresh
            }
        }
        case GET_ARBITRAGE_EXCHANGES: {
            return {
                ...state,
                exchanges: payload,
            }
        }
        case SET_ARBITRAGE_FILTERS: {
            return {
                ...state,
                filters: payload || state.filters,
            }
        }
        default: return state
    }
}