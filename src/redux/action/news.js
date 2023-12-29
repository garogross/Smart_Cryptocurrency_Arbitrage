import {
    CREATE_NEWS_ERROR,
    CREATE_NEWS_LOADING_START, CREATE_NEWS_SUCCESS, EDIT_NEWS_ERROR, EDIT_NEWS_SUCCESS,
    GET_NEWS_ERROR,
    GET_NEWS_LOADING_START,
    GET_NEWS_SUCCESS
} from "../types";
import {
    authConfig,
    createNewsUrl,
    editNewsUrl,
    fetchRequest,
    getNewsUrl,
    setEmptyFieldsError,
    setError
} from "./fetchTools";
import {newsTypes, subscriptionTypes} from "../../constants";


export const getNews = () => async (dispatch, getState) => {
    dispatch({type: GET_NEWS_LOADING_START})
    try {
        const fetchData = await fetchRequest(getNewsUrl)
        const user = getState().auth.user

        const types = user.subscription === subscriptionTypes.free ?
            [newsTypes.free] :
            Object.values(newsTypes)
        const payload = fetchData.News.filter(item => types.includes(item.Type)).map(item => {
            return Object.keys(item).reduce((acc, cur) => {
                acc[cur.toLowerCase()] = item[cur]
                return acc
            }, {})
        })

        dispatch({type: GET_NEWS_SUCCESS, payload})

    } catch (err) {
        dispatch({type: GET_NEWS_ERROR, payload: err})
    }
}

export const createNews = (formData,clb) => async (dispatch,getState) => {
    dispatch({type: CREATE_NEWS_LOADING_START})

    const data = new FormData();

    for (const key in formData) {
        data.append(key, formData[key]);
    }

    try {
        setEmptyFieldsError(formData)
        const fetchData = await fetchRequest(createNewsUrl,"POST",data,authConfig(true))
        const news = getState().news.data
        const payload = [

            {
                ...formData,
                id: fetchData.id,
                picture: fetchData.url,
            },
            ...news,
        ]
        dispatch({type: CREATE_NEWS_SUCCESS,payload})
        clb()
    } catch (err) {
        console.error({err})
        dispatch({type: CREATE_NEWS_ERROR, payload: err})
    }
}

export const editNews = (formData,clb) => async (dispatch,getState) => {
    dispatch({type: CREATE_NEWS_LOADING_START})
    const data = new FormData();
    for (const key in formData) {
        if(!formData[key]) continue;
        data.append(key, formData[key]);
    }

    try {
        const fetchData = await fetchRequest(editNewsUrl,"POST",data,authConfig(true))
        const news = getState().news.data
        const payload = [...news]

        const updatingItemIndex = payload.findIndex(item => item.id === formData.id)

        payload[updatingItemIndex] = {
            ...formData,
            picture: fetchData.url
        }

        dispatch({type: EDIT_NEWS_SUCCESS,payload})
        clb()
    } catch (err) {
        console.error({err})
        dispatch(setError(err,EDIT_NEWS_ERROR))
    }
}