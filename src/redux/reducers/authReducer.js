import {AUTH_ERROR, AUTH_LOADING_START, AUTH_SUCCESS, LOGOUT_USER} from "../types";


const initialState = {
    token: null,
    user: null,
    loading: false,
    error: []
}

export const authReducer = (state = initialState,action) => {
    const {type,payload} = action

    switch (type) {
        case AUTH_SUCCESS: {
            return {
                ...state,
                loading: false,
                token: payload.token,
                user: payload.user,
            };
        }
        case AUTH_LOADING_START: {
            return {
                ...state,
                loading: true
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload
            };
        }
        case LOGOUT_USER: {
            return {
                ...state,
                token: null,
                user: null,
            };
        }
        default: return state
    }
}