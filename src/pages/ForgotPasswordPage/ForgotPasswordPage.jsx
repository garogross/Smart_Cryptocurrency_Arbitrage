import React from 'react';
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {formProps} from "./formProps";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {forgotPassword} from "../../redux/action/auth";
import {resetPasswordPagePath} from "../../router/path";

function ForgotPasswordPage() {
    const loading = useSelector(state => state.auth.forgotPasswordLoading)
    const error = useSelector(state => state.auth.forgotPasswordError)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (formData) => {
        const onSuccess = () => navigate(resetPasswordPagePath,{ state: formData })
        dispatch(forgotPassword(formData,onSuccess))
    }

    return (
        <AuthBlock
            {...formProps()}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
        />
    );
}

export default ForgotPasswordPage;