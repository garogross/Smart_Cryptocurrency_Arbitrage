import SupportPage from "../pages/SupportPage/SupportPage";
import SubscribtionPage from "../pages/SubscribtionPage/SubscribtionPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";
import ArbitragePage from "../pages/ArbitragePage/ArbitragePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import PrivateRoute from "./PrivateRoute";

export const mainPagePath = '/'
export const arbitragePagePath = '/arbitrage'
export const resetPasswordPagePath = '/resetPassword'
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
        component: <PrivateRoute element={<ArbitragePage/>}/>
    },
    {
        path: resetPasswordPagePath,
        component: <PrivateRoute element={<ResetPasswordPage/>} noAuth={true}/>
    },
    {
        path: forgotPasswordPagePath,
        component: <PrivateRoute element={<ForgotPasswordPage/>} noAuth={true}/>
    },
    {
        path: loginPagePath,
        component: <PrivateRoute element={<LoginPage/>} noAuth={true}/>
    },
    {
        path: newsPagePath,
        component: <PrivateRoute element={<NewsPage/>}/>
    },
    {
        path: settingsPagePath,
        component: <PrivateRoute element={<SettingsPage/>}/>
    },
    {
        path: signUpPagePath,
        component: <PrivateRoute element={<SignUpPage/>} noAuth={true}/>
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