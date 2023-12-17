import {
    AUTH_ERROR,
    AUTH_LOADING_START,
    AUTH_SUCCESS,
    LOGOUT_USER, POST_EMPLOYEES_SUCCESS,
    POST_SUBTASK_SUCCESS,
    POST_TASK_SUCCESS
} from "../types";
import {fetchRequest, loginUrl, setError} from "./fetchTools";


export const login = (formData,requiredRole,clb) => async (dispatch) => {
    dispatch({type: AUTH_LOADING_START})

    try {
        const fetchData = await fetchRequest(loginUrl,'POST',JSON.stringify(formData))

        if(fetchData.status === 'success' && fetchData.user.role === requiredRole) {
            const {token,user} = fetchData
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({type: AUTH_SUCCESS,payload: {token,user}})
            clb()
        } else {
            dispatch({type: AUTH_ERROR,payload: {error: `You can't log in` }})
        }
    } catch (err) {
        console.error({err})
        dispatch(setError(err,AUTH_ERROR))
    }
}

export const setAuthError = (payload) => dispatch => {
    dispatch({type: AUTH_ERROR,payload})
}

export const checkIsLoggedIn = () => (dispatch) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if(token && user) {
        dispatch({type: AUTH_SUCCESS,payload: {token,user}})
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({type: LOGOUT_USER})
    dispatch({type: POST_TASK_SUCCESS, payload: []})
    dispatch({type: POST_SUBTASK_SUCCESS, payload: []})
    dispatch({type: POST_EMPLOYEES_SUCCESS, payload: []})
}