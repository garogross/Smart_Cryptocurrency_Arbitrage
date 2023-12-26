import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_LOADING_START,
    CHANGE_PASSWORD_SUCCESS,
    EDIT_USER_DATA_ERROR,
    EDIT_USER_DATA_LOADING_START,
    EDIT_USER_DATA_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_LOADING_START,
    FORGOT_PASSWORD_SUCCESS, GET_USER_ERROR, GET_USER_LOADING_START, GET_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING_START,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_LOADING_START,
    RESET_PASSWORD_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_LOADING_START,
    SIGNUP_SUCCESS
} from "../types";


const initialState = {
    token: null,
    user: null,
    loginLoading: false,
    loginError: null,
    signupLoading: false,
    signupError: null,
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    resetPasswordLoading: false,
    resetPasswordError: null,
    editDataLoading: false,
    editDataError: null,
    changePasswordLoading: false,
    changePasswordError: null,
    getUserLoading: false,
    getUserError: null,
}

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                loginLoading: false
            }
        }
        case LOGIN_LOADING_START: {
            return {
                ...state,
                loginLoading: true,
                loginError: null,
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: payload,
                loginLoading: false
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                signupLoading: false
            }
        }
        case SIGNUP_LOADING_START: {
            return {
                ...state,
                signupError: null,
                signupLoading: true
            }
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                signupLoading: false,
                signupError: payload
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordLoading: false
            }
        }
        case FORGOT_PASSWORD_LOADING_START: {
            return {
                ...state,
                forgotPasswordLoading: true,
                forgotPasswordError: null,
            }
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordLoading: false,
                forgotPasswordError: payload
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordLoading: false,
                token: payload.token,
                user: payload.user
            }
        }
        case RESET_PASSWORD_LOADING_START: {
            return {
                ...state,
                resetPasswordLoading: true,
                resetPasswordError: null,
            }
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordError: payload,
                resetPasswordLoading: false
            }
        }
        case EDIT_USER_DATA_SUCCESS: {
            return {
                ...state,
                user: payload,
                editDataLoading: false
            }
        }
        case EDIT_USER_DATA_LOADING_START: {
            return {
                ...state,
                editDataLoading: true,
                editDataError: null,
            }
        }
        case EDIT_USER_DATA_ERROR: {
            return {
                ...state,
                editDataLoading: false,
                editDataError: payload
            }
        }
        case CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                changePasswordLoading: false
            }
        }
        case CHANGE_PASSWORD_LOADING_START: {
            return {
                ...state,
                changePasswordLoading: true,
                changePasswordError: null
            }
        }
        case CHANGE_PASSWORD_ERROR: {
            return {
                ...state,
                changePasswordLoading: false,
                changePasswordError: payload
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserLoading: false,
                user: payload.user || state.user,
                token: payload.token || state.token,
            }
        }
        case GET_USER_LOADING_START: {
            return {
                ...state,
                getUserError: false,
                getUserLoading: true,
            }
        }
        case GET_USER_ERROR: {
            return {
                ...state,
                getUserError: payload,
                getUserLoading: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                token: null,
                user: null,
            };
        }
        default:
            return state
    }
}