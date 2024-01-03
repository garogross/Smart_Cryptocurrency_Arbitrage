import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useLocation} from 'react-router-dom';
import {
    routes,
} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";
import {changeUserData, checkIsLoggedIn, onUserSubscribe} from "../../redux/action/auth";
import {subscriptionTypes} from "../../constants";
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";
import {getLSItem, setLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/lsProps";
import {subscribePush} from "../../utils/functions/pushNotification";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    useEffect(() => {

        if (!user) return;
        let usePush = getLSItem(lsProps.usePushNot, true)
        const  pushendpoint = getLSItem(lsProps.pushendpoint)
        if (
            ('Notification' in window) &&
            user.subscription === subscriptionTypes.arb &&
            (usePush || usePush === null) &&
            !pushendpoint
        ) {
            subscribePush((sub) => dispatch(onUserSubscribe(sub)),usePush)
        }
    }, [user]);


    useEffect(() => {
        dispatch(checkIsLoggedIn())
    }, []);


    return (
        <>
            <Navbar/>
            <Routes>
                {
                    routes.map(({path, component}, index) => (
                        <Route path={path} element={component} key={index}/>
                    ))
                }
            </Routes>
        </>
    );
}

export default App;