import React from 'react';
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {formProps} from "./formProps";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {mainPagePath} from "../../router/path";
import {login} from "../../redux/action/auth";

function LoginPage() {
    const error = useSelector(state => state.auth.loginError)
    const loading = useSelector(state => state.auth.loginLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (formData) => {
        const navigateToHome = () => navigate(mainPagePath)
        dispatch(login(formData,navigateToHome))
    }
    return (
        <AuthBlock
            {...formProps()}
            error={error}
            onSubmit={onSubmit}
            loading={loading}
        />
    );
}

export default LoginPage;