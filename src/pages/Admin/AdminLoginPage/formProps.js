import {emailImage, passwordImage} from "../../../assets/images";
import {Link} from "react-router-dom";
import {forgotPasswordPagePath, signUpPagePath} from "../../../router/path";
import React from "react";

export const formProps = () =>  ({
    title: <>Войти как <span className={'blueText'}>Админ</span></>,
    fields: [
        {
            type: 'email',
            key: "email",
            placeholder: "E-mail",
            img: emailImage
        },
        {
            type: 'password',
            key: "password",
            placeholder: "Пароль",
            img: passwordImage
        },
    ],
    btnText: "Войти",
    link: <>
        Восстановить <Link to={forgotPasswordPagePath} className="blueText">пароль</Link><br/><br/>
        Создать <Link to={signUpPagePath} className="blueText">аккаунт</Link>
    </>,
})