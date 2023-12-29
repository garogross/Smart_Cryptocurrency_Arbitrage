import {getLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/cookies";

export const baseUrl = 'http://116.202.58.43:8000';

export const baseConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export const authConfig = (isFormData) => {
    const token = getLSItem(lsProps.token,true);
    return {
        headers: {
            'Authorization': token ? `Bearer ${token}` : null,
        }
    }
}

export const setEmptyFieldsError = (formData) => {
    let emptyField = Object.keys(formData).find(item => !formData[item])

    if (emptyField) {
        throw {message: `${emptyField} обязательно к заполнению`, status: 400};
    }
}


// auth
export const signupUrl = '/signup'
export const siginUrl = '/signin'
export const forgotPasswordUrl = '/forgotPassword'
export const resetPasswordUrl = '/resetPassword'
export const checkIsSubscribedUrl = '/isSubscribed'
export const changePassUrl = '/changePass'
export const editUserDataUrl = '/changeUser'

// news
export const getNewsUrl = '/news'
export const createNewsUrl = '/createNews'
export const editNewsUrl = '/editNews'

// arbitrage
export const getArbitrageUrl = '/arb'


export const fetchRequest = async (fetchUrl, method = 'GET', body = null, config = authConfig()) => {
    const response = await fetch(`${baseUrl}${fetchUrl}`, {
        method: method,
        body: body,
        ...config
    });
    const resData = await response.json();

    if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {message: resData, status: response.status};
    }
    return resData
}


export const setError = (err, type) => dispatch => {

    const errors = [
        {
            text: "Empty email",
            translate: "Эл. адрес не существует"
        },
        {
            text: 'Email already exists',
            translate: "Эл. адрес уже существует"
        },
        {
            text: 'Wrong password',
            translate: "Неверный пароль"
        },
    ]

    const {message} = err

    let payload = ""
    if (message && message.includes('Unexpected token')) {

        const curError = errors.find(item => message.includes(item.text))

        if (curError) {
            payload = curError.translate
        } else {
            payload = message.slice(message.indexOf(`, "`) + 3, message.indexOf(`" is not valid JSON`))
        }
    } else {
        payload = message !== undefined ? message : err
    }
    dispatch({type, payload})

}