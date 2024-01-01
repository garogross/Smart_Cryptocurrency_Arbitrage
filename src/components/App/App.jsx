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
        // if (user && user.subscription === subscriptionTypes.arb && !user?.push_notification?.endpoint) {
            console.log("useEffect")
            Notification.requestPermission().then(type => {
                console.log("requestPermission",type)
                if (type === "granted") {
                    const clb = (subscription) => {
                        fetch(`http://localhost:5000/api/v1/translate/subscribe`, {
                            method: 'POST',
                            body: JSON.stringify(subscription),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        // dispatch(changeUserData({push_subscription: subscription}))
                    }

                    // serviceWorkerRegistration.register(clb);
                }
            })
        // }
    }, []);

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