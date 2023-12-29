import {
    CREATE_NEWS_ERROR,
    CREATE_NEWS_LOADING_START,
    CREATE_NEWS_SUCCESS, EDIT_NEWS_ERROR, EDIT_NEWS_LOADING_START, EDIT_NEWS_SUCCESS,
    GET_NEWS_ERROR,
    GET_NEWS_LOADING_START,
    GET_NEWS_SUCCESS
} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null,
    createLoading: false,
    createError: null,
    editLoading: false,
    editError: null,
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
        case CREATE_NEWS_SUCCESS: {
            return {
                ...state,
                createLoading: false,
                data: payload
            }
        }
        case CREATE_NEWS_LOADING_START: {
            return {
                ...state,
                createLoading: true,
                createError: null
            }
        }
        case CREATE_NEWS_ERROR: {
            return {
                ...state,
                createLoading: false,
                createError: payload
            }
        }
        case EDIT_NEWS_SUCCESS: {
            return {
                ...state,
                editLoading: false,
                data: payload
            }
        }
        case EDIT_NEWS_LOADING_START: {
            return {
                ...state,
                editLoading: true,
                editError: null
            }
        }
        case EDIT_NEWS_ERROR: {
            return {
                ...state,
                editLoading: false,
                editError: payload
            }
        }

        default: return state;
    }
}