import Cookies from "js-cookie";

export const baseUrl = 'http://116.202.58.43:8000';

export const baseConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export const authConfig = () => {
    const token = Cookies.get('token');
    return {
        headers: {
            'Authorization': token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
        }
    }
}


// auth
export const signupUrl = '/signup'
export const siginUrl = '/signin'
export const forgotPasswordUrl = '/forgotPassword'
export const resetPasswordUrl = '/resetPassword'
export const checkIsSubscribedUrl = '/isSubscribed'
export const changePassUrl = '/changePass'
export const getNewsUrl = '/news'
export const editUserDataUrl = '/changeUser'


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