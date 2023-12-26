import React from 'react';
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {formProps} from "./formProps";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../redux/action/auth";
import {useNavigate} from "react-router-dom";
import {mainPagePath} from "../../router/path";

function SignUpPage() {
    const loading = useSelector(state => state.auth.signupLoading)
    const error = useSelector(state => state.auth.signupError)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (formData) => {
        const navigateToHome = () => navigate(mainPagePath)
        dispatch(signup(formData,navigateToHome))
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

export default SignUpPage;