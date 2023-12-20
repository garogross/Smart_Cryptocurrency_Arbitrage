import React from 'react';
import AuthBlock from "../../components/global/AuthBlock/AuthBlock";
import {emailImage, passwordImage, userImage} from "../../assets/images";
import {Link} from "react-router-dom";
import {loginPagePath} from "../../router/path";
import {formProps} from "./formProps";

function SignUpPage(props) {

    return (
        <AuthBlock
            {...formProps()}
        />
    );
}

export default SignUpPage;