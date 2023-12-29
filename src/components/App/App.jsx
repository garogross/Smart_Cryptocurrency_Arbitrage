import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useLocation} from 'react-router-dom';
import {
    adminLoginPagePath, adminNewsPagePath,
    forgotPasswordPagePath,
    loginPagePath,
    resetPasswordPagePath,
    routes,
    signUpPagePath
} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";
import {changeUserData, checkIsLoggedIn} from "../../redux/action/auth";
import {regSw, subscribe} from '../../helper';
import {subscriptionTypes} from "../../constants";

const navbarDisabledPages = [
    loginPagePath,
    signUpPagePath,
    forgotPasswordPagePath,
    resetPasswordPagePath,
    adminLoginPagePath,
]

function App() {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const isNavigationDisabled = !navbarDisabledPages.includes(location.pathname)

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

    useEffect(() => {
        if(!isNavigationDisabled) document.body.classList.remove('navbarOpened')
    }, [location]);


    return (
        <>
            {
                !navbarDisabledPages.includes(location.pathname) ?
                    <Navbar/>
                    : null
            }
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