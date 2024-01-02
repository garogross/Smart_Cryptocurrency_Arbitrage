import React from 'react';
import {formProps} from "../../LoginPage/formProps";
import AuthBlock from "../../../components/global/AuthBlock/AuthBlock";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {adminNewsPagePath} from "../../../router/path";
import {login} from "../../../redux/action/auth";

function AdminLoginPage(props) {
    const error = useSelector(state => state.auth.loginError)
    const loading = useSelector(state => state.auth.loginLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (formData) => {
        const navigateToHome = () => navigate(adminNewsPagePath)
        dispatch(login(formData,navigateToHome,true))
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

export default AdminLoginPage;