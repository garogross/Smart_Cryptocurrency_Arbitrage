import SupportPage from "../pages/SupportPage/SupportPage";
import SubscribtionPage from "../pages/SubscribtionPage/SubscribtionPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import ArbitragePage from "../pages/ArbitragePage/ArbitragePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

export const mainPagePath = '/'
export const arbitragePagePath = '/arbitrage'
export const changePasswordPagePath = '/changePassword'
export const forgotPasswordPagePath = '/forgotPassword'
export const loginPagePath = '/login'
export const newsPagePath = '/news'
export const settingsPagePath = '/settings'
export const signUpPagePath = '/signUp'
export const subscribtionPagePath = '/subscribtion'
export const supportPagePath = '/support'

export const routes = [
    {
        path: mainPagePath,
        component: <MainPage/>
    },
    {
        path: arbitragePagePath,
        component: <ArbitragePage/>
    },
    {
        path: changePasswordPagePath,
        component: <ChangePasswordPage/>
    },
    {
        path: forgotPasswordPagePath,
        component: <ForgotPasswordPage/>
    },
    {
        path: loginPagePath,
        component: <LoginPage/>
    },
    {
        path: newsPagePath,
        component: <NewsPage/>
    },
    {
        path: settingsPagePath,
        component: <SettingsPage/>
    },
    {
        path: signUpPagePath,
        component: <SignUpPage/>
    },
    {
        path: subscribtionPagePath,
        component: <SubscribtionPage/>
    },
    {
        path: supportPagePath,
        component: <SupportPage/>
    },
    {
        path: '*',
        component: <ErrorPage/>
    },
]