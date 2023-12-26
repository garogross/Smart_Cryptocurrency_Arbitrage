import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {formProps} from "./formProps";
import {mainPagePath} from "../../router/path";
import {resetPassword} from "../../redux/action/auth";

function ResetPasswordPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const loading = useSelector(state => state.auth.resetPasswordLoading)
    const error = useSelector(state => state.auth.resetPasswordError)

    const {email} = location.state
    const onSubmit = (formData) => {
        const onSuccess = () => navigate(mainPagePath)
        dispatch(resetPassword({...formData,email},onSuccess))
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

export default ResetPasswordPage;