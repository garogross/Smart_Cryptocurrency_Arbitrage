import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom';
import {routes} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";
import {changeUserData, checkIsLoggedIn} from "../../redux/action/auth";
import {regSw, subscribe} from '../../helper';
import {subscriptionTypes} from "../../constants";

function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const onSubscribe = (data) => {
        dispatch(changeUserData({push_subscription: data}))
    }

    async function registerAndSubscribe() {
        try {
            const serviceWorkerReg = await regSw();
            await subscribe(serviceWorkerReg, onSubscribe);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (user && user.subscription === subscriptionTypes.arb) {
            registerAndSubscribe()
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