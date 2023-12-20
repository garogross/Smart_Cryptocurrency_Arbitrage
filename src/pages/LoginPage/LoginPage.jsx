import React from 'react';
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {formProps} from "./formProps";

function LoginPage(props) {
    return (
        <AuthBlock
            {...formProps()}
        />
    );
}

export default LoginPage;