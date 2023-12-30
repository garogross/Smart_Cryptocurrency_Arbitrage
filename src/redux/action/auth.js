import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_LOADING_START,
    CHANGE_PASSWORD_SUCCESS,
    EDIT_USER_DATA_ERROR,
    EDIT_USER_DATA_LOADING_START,
    EDIT_USER_DATA_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_LOADING_START,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_ERROR,
    GET_USER_LOADING_START,
    GET_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING_START,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_LOADING_START,
    RESET_PASSWORD_SUCCESS, SET_ARBITRAGE_FILTERS,
    SIGNUP_ERROR,
    SIGNUP_LOADING_START,
    SIGNUP_SUCCESS
} from "../types";
import {
    authConfig,
    baseConfig,
    changePassUrl,
    checkIsSubscribedUrl, editUserDataUrl,
    fetchRequest,
    forgotPasswordUrl, getUserUrl,
    resetPasswordUrl, setEmptyFieldsError,
    setError,
    siginUrl,
    signupUrl
} from "./fetchTools";
import {subscriptionTypes} from "../../constants";
import {getLSItem, removeLSItem, setLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/cookies";




const authenticateUser = (url, formData, successType, setError, clb,config,forFilters,isAdmin) => async (dispatch) => {
    const method = formData ? 'POST' : 'GET'
    const body = formData ? JSON.stringify(formData) : null
    const {
        Token: token,
        User,
        Status: status
    } = await fetchRequest(url,method, body, config || baseConfig)
    if ((token && User && !status) || (status === 'Success')) {
        if(isAdmin && User.role !== 'admin') {
            throw {message: 'Ты не Админ', status: 400};
        }

        const {min_amount,max_amount,profit,hidden,blacklist,exchanges,hidden_time,...user} = User

        const filters = {
            min_amount,max_amount,profit,hidden: hidden || [],blacklist: blacklist || [],exchanges,hidden_time
        }


        if(!forFilters) {
            dispatch({type: successType, payload: {token, user}})
            setLSItem(lsProps.token, token)
            setLSItem(lsProps.user,user)
        }
        dispatch({type: SET_ARBITRAGE_FILTERS, payload: filters})
        setLSItem(lsProps.filters, filters)
        if(clb) clb()
    } else {
        dispatch(setError('Не авторизован'))
    }
}

export const signup = (formData, clb) => async (dispatch) => {
    dispatch({type: SIGNUP_LOADING_START})

    setEmptyFieldsError(formData)

    try {
        await dispatch(authenticateUser(signupUrl, formData, SIGNUP_SUCCESS, setSignupError, clb))
    } catch (err) {
        dispatch(setSignupError(err))
    }
}

export const checkIsLoggedIn = () => (dispatch) => {
    dispatch({type: GET_USER_LOADING_START})
    const token = getLSItem(lsProps.token)
    const user = getLSItem(lsProps.user,true)
    const filters = getLSItem(lsProps.filters,true)
    dispatch({type: GET_USER_SUCCESS, payload: {token, user}})
    dispatch({type: SET_ARBITRAGE_FILTERS,payload: filters})

    if(token) {
        dispatch(getUser())
    }
}

export const setSignupError = (err) => dispatch => {
    dispatch(setError(err, SIGNUP_ERROR))
}

export const login = (formData, clb,isAdmin) => async (dispatch) => {
    dispatch({type: LOGIN_LOADING_START})
    try {
        setEmptyFieldsError(formData)
        await dispatch(authenticateUser(siginUrl, formData, LOGIN_SUCCESS, setLoginError, clb,undefined,undefined,isAdmin))
    } catch (err) {
        console.error({err})
        dispatch(setLoginError(err))
    }
}

export const setLoginError = (err) => dispatch => {
    dispatch(setError(err, LOGIN_ERROR))
}

export const getUser = () => async (dispatch) => {
    dispatch({type: GET_USER_LOADING_START})
    try {
        await dispatch(authenticateUser(getUserUrl, null, GET_USER_SUCCESS, setGetUserError, undefined,authConfig()))
    } catch (err) {
        console.error({err})
        dispatch(setLoginError(err))
    }
}

export const setGetUserError = (err) => dispatch => {
    dispatch(setError(err, GET_USER_ERROR))
}

export const forgotPassword = (formData, clb) => async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_LOADING_START})
    try {
        setEmptyFieldsError(formData)

        const {Status: status} = await fetchRequest(forgotPasswordUrl, 'POST', JSON.stringify(formData), baseConfig)

        if (status !== 'OK') {
            throw {message: `Неверный Эл. адрес`, status: 400};
        }
        dispatch({type: FORGOT_PASSWORD_SUCCESS})
        clb()

    } catch (err) {
        console.error({err})
        dispatch(setForgotPasswordError(err))
    }
}

export const setForgotPasswordError = (err) => dispatch => {
    dispatch(setError(err, FORGOT_PASSWORD_ERROR))
}

export const resetPassword = (formData, clb) => async (dispatch) => {
    dispatch({type: RESET_PASSWORD_LOADING_START})
    try {
        setEmptyFieldsError(formData)
        await dispatch(authenticateUser(resetPasswordUrl, {
            ...formData,
            activation_code: +formData.activation_code
        }, RESET_PASSWORD_SUCCESS, setResetPasswordError, clb))
    } catch (err) {
        console.error({err})
        dispatch(setResetPasswordError(err))
    }
}

export const setResetPasswordError = (err) => dispatch => {
    dispatch(setError(err, RESET_PASSWORD_ERROR))
}


export const logOut = (clb) => (dispatch) => {
    removeLSItem(lsProps.token)
    removeLSItem(lsProps.user)
    removeLSItem(lsProps.filters)
    dispatch({type: LOGOUT_USER})
    if (clb) clb()
}

export const checkIsSubscribed = (clb) => async (dispatch, getState) => {
    dispatch({type: GET_USER_LOADING_START})
    try {
        const fetchData = await fetchRequest(checkIsSubscribedUrl)
        const user = getState().auth.user
        const subscription = fetchData.IsSubscribed ? subscriptionTypes.arb : subscriptionTypes.free
        const newData =  {...user, subscription}
        dispatch({type: GET_USER_SUCCESS, payload: {user: newData}})
        setLSItem(lsProps.user,newData)
        if (clb) clb()

    } catch (err) {
        console.error({err})
        dispatch({type: GET_USER_ERROR})
    }
}

export const changePassword = (formData, clb) => async (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_LOADING_START})
    try {
        setEmptyFieldsError(formData)
        await fetchRequest(changePassUrl, 'POST', JSON.stringify(formData))
        dispatch({type: CHANGE_PASSWORD_SUCCESS})
        clb()
    } catch (err) {
        console.error(err?.message)
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: err?.message === 'Unexpected end of JSON input' ? 'Неверный старый пароль' : err.message
        })
    }
}

export const changeUserData = (formData, showEmptyFieldsError, clb) => async (dispatch, getState) => {
    if(showEmptyFieldsError) dispatch({type: EDIT_USER_DATA_LOADING_START})

    const user = getState().auth.user

    const reqData = {
        id: user.id,
        field: Object.keys(formData),
        value: Object.values(formData)
    }
    try {
        if (showEmptyFieldsError) setEmptyFieldsError(formData)
        dispatch(authenticateUser(
            editUserDataUrl,
            reqData,
            EDIT_USER_DATA_SUCCESS,
            setEditUserDataError,
            clb,
            authConfig(),
            !showEmptyFieldsError
        ))
    } catch (err) {
        dispatch({type: EDIT_USER_DATA_ERROR, payload: err})
    }
}

export const setEditUserDataError = (err) => dispatch => {
    dispatch(setError(err, EDIT_USER_DATA_ERROR))
}
