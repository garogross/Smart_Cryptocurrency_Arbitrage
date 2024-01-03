import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useLocation} from 'react-router-dom';
import {
    routes,
} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";
import {changeUserData, checkIsLoggedIn} from "../../redux/action/auth";
import {subscriptionTypes} from "../../constants";
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";
import {getLSItem, setLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/lsProps";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        let usePush = getLSItem(lsProps.usePushNot,true)

        if(usePush === null) {
            setLSItem(lsProps.usePushNot,true)
            usePush = true
        }
        if (
            ('Notification' in window) &&
            user &&
            user.subscription === subscriptionTypes.arb &&
            usePush
        ) {
            console.log("useEffect")
            Notification.requestPermission().then(type => {
                console.log("requestPermission",type)
                if (type === "granted") {
                    const clb = (subscription) => {
                        dispatch(changeUserData({push_subscription: subscription}))
                    }
                    serviceWorkerRegistration.register(clb);
                }
            })
        }
    }, []);


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