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

export const routes = [
    {
        path: '/',
        component: <MainPage/>
    },
    {
        path: 'arbitrage',
        component: <ArbitragePage/>
    },
    {
        path: 'changePassword',
        component: <ChangePasswordPage/>
    },
    {
        path: 'forgotPassword',
        component: <ForgotPasswordPage/>
    },
    {
        path: 'login',
        component: <LoginPage/>
    },
    {
        path: 'news',
        component: <NewsPage/>
    },
    {
        path: 'settings',
        component: <SignUpPage/>
    },
    {
        path: 'signUp',
        component: <SignUpPage/>
    },
    {
        path: 'subscribtion',
        component: <SubscribtionPage/>
    },
    {
        path: 'support',
        component: <SupportPage/>
    },
    {
        path: '*',
        component: <ErrorPage/>
    },
]