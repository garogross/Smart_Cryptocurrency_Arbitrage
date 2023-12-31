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

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (user && user.subscription === subscriptionTypes.arb) {
            Notification.requestPermission().then(type => {
                if (type === "granted") {
                    const clb = (subscription) => {
                        dispatch(changeUserData({push_subscription: subscription}))
                    }

                    serviceWorkerRegistration.register(clb);
                }
            })
        }
    }, [user]);

    useEffect(() => {
        if (user && user.subscription === subscriptionTypes.arb) {
            // registerAndSubscribe()
        }
    }, [user])

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