import {combineReducers} from "redux"
import {authReducer} from "./authReducer";
import {newsReducer} from "./newsReducer";
import {arbitrageReducer} from "./arbitrageReducer";

export default combineReducers({
    auth: authReducer,
    news: newsReducer,
    arbitrage: arbitrageReducer,
})