import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom';
import {
    routes,
} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";
import {checkIsLoggedIn, onUserSubscribe} from "../../redux/action/auth";
import {subscriptionTypes} from "../../constants";
import {getLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/lsProps";
import {subscribePush} from "../../utils/functions/pushNotification";
import ParticlesBg from "../global/particlesBg/ParticlesBg";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)


    useEffect(() => {

        if (!user) return;
        let usePush = getLSItem(lsProps.usePushNot, true)
        const pushendpoint = getLSItem(lsProps.pushendpoint)
        if (
            ('Notification' in window) &&
            user.subscription === subscriptionTypes.arb &&
            (usePush || usePush === null) &&
            !pushendpoint
        ) {
            subscribePush((sub) => dispatch(onUserSubscribe(sub)), usePush)
        }
    }, [user]);


    useEffect(() => {
        dispatch(checkIsLoggedIn())
    }, []);

    return (
        <>
            <ParticlesBg/>
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