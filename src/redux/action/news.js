import {GET_NEWS_ERROR, GET_NEWS_LOADING_START, GET_NEWS_SUCCESS} from "../types";
import {fetchRequest, getNewsUrl} from "./fetchTools";


export const getNews = () => async (dispatch) => {
    dispatch({type: GET_NEWS_LOADING_START})
    try {
        const fetchData = await fetchRequest(getNewsUrl)
        const payload = fetchData.News.map(item => {
            return Object.keys(item).reduce((acc,cur) => {
                acc[cur.toLowerCase()] = item[cur]
                return acc
            },{})
        })

        console.log({payload})

        dispatch({type: GET_NEWS_SUCCESS,payload})

    } catch (err) {
        dispatch({type: GET_NEWS_ERROR,payload: err})
    }
}