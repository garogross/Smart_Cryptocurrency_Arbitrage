import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_LOADING_START, CHANGE_PASSWORD_SUCCESS, EDIT_USER_DATA_LOADING_START, EDIT_USER_DATA_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_LOADING_START, FORGOT_PASSWORD_SUCCESS, GET_USER_ERROR, GET_USER_LOADING_START, GET_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING_START,
    LOGIN_SUCCESS, LOGOUT_USER, RESET_PASSWORD_ERROR, RESET_PASSWORD_LOADING_START, RESET_PASSWORD_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_LOADING_START, SIGNUP_SUCCESS
} from "../types";
import {
    baseConfig,
    changePassUrl,
    checkIsSubscribedUrl, editUserDataUrl,
    fetchRequest,
    forgotPasswordUrl,
    resetPasswordUrl,
    setError,
    siginUrl,
    signupUrl
} from "./fetchTools";
import Cookies from 'js-cookie'
import {subscriptionTypes} from "../../constants";


const setEmptyFieldsError = (formData) => {
    let emptyField = Object.keys(formData).find(item => !formData[item])

    if (emptyField) {
        throw {message: `${emptyField} обязательно к заполнению`, status: 400};
    }
}

const authenticateUser = (url, formData, successType, setError, clb,method) => async (dispatch) => {
    const {Token: token, User: user, Status: status} = await fetchRequest(url, method || 'POST', JSON.stringify(formData),baseConfig)
    if ((token && user && !status) || (status === 'Success')) {
        dispatch({type: successType, payload: {token,user: {...user,subscription: 'arb'}}})
        Cookies.set('token', token)
        Cookies.set('user', JSON.stringify({...user,subscription: 'arb'}))
        clb()
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
    const token = Cookies.get('token')
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
    dispatch({type: GET_USER_SUCCESS, payload: {token, user}})
}

export const setSignupError = (err) => dispatch => {
    dispatch(setError(err, SIGNUP_ERROR))
}

export const login = (formData, clb) => async (dispatch) => {
    dispatch({type: LOGIN_LOADING_START})
    try {
        setEmptyFieldsError(formData)
        await dispatch(authenticateUser(siginUrl, formData, LOGIN_SUCCESS, setLoginError, clb))
    } catch (err) {
        console.error({err})
        dispatch(setLoginError(err))
    }
}

export const setLoginError = (err) => dispatch => {
    dispatch(setError(err, LOGIN_ERROR))
}

export const forgotPassword = (formData, clb) => async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_LOADING_START})
    try {
        setEmptyFieldsError(formData)

        const {Status: status} = await fetchRequest(forgotPasswordUrl, 'POST', JSON.stringify(formData),baseConfig)

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
    Cookies.remove('token')
    Cookies.remove('user')
    dispatch({type: LOGOUT_USER})
    if (clb) clb()
}

export const checkIsSubscribed = (clb) => async (dispatch, getState) => {
    dispatch({type: GET_USER_LOADING_START})
    try {
        const fetchData = await fetchRequest(checkIsSubscribedUrl)
        const user = getState().auth.user
        const subscription = fetchData.IsSubscribed ? subscriptionTypes.arb : subscriptionTypes.free

        dispatch({type: GET_USER_SUCCESS, payload: {user: {...user, subscription}}})
        if (clb) clb()

    } catch (err) {
        console.error({err})
        dispatch({type: GET_USER_ERROR})
    }
}

export const changePassword = (formData,clb) => async (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_LOADING_START})
    try {
        setEmptyFieldsError(formData)
        await fetchRequest(changePassUrl, 'POST', JSON.stringify(formData))
        dispatch({type: CHANGE_PASSWORD_SUCCESS})
        clb()
    } catch (err) {
        console.error(err?.message)
        dispatch({type: CHANGE_PASSWORD_ERROR,payload: err?.message === 'Unexpected end of JSON input' ? 'Неверный старый пароль' : err.message})
    }
}

export const changeUserData = (formData,showEmptyFieldsError,clb) => async (dispatch,getState) => {
    dispatch({type: EDIT_USER_DATA_LOADING_START})

    const user = getState().autch.user

    const reqData = {
        id: user.id,
        field: Object.keys(formData),
        value: Object.values(formData)
    }

    try {

        if(showEmptyFieldsError) setEmptyFieldsError(formData)
        dispatch(authenticateUser(editUserDataUrl,reqData,EDIT_USER_DATA_SUCCESS,))
        const {Token: token,User: user} = await fetchRequest(editUserDataUrl, 'PATCH', JSON.stringify(reqData))
        dispatch({type: CHANGE_PASSWORD_SUCCESS})
        clb()
    } catch (err) {
        console.error(err?.message)
        dispatch({type: CHANGE_PASSWORD_ERROR,payload: err?.message === 'Unexpected end of JSON input' ? 'Неверный старый пароль' : err.message})
    }
}