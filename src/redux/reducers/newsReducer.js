import {GET_NEWS_ERROR, GET_NEWS_LOADING_START, GET_NEWS_SUCCESS} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null
}


export const newsReducer = (state = initialState,action) => {
    const {payload,type} = action

    switch (type) {
        case GET_NEWS_SUCCESS: {
            return {
                ...state,
                data: payload,
                getLoading: false
            }
        }
        case GET_NEWS_LOADING_START: {
            return {
                ...state,
                getLoading: true

            }
        }
        case GET_NEWS_ERROR: {
            return {
                ...state,
                getLoading: false,
                getError: payload

            }
        }
        default: return state;
    }
}