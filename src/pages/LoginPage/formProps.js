import {emailImage, passwordImage} from "../../assets/images";
import React from "react";
import {Link} from "react-router-dom";
import {forgotPasswordPagePath, signUpPagePath} from "../../router/path";


export const formProps = () =>  ({
    title: <>Войти в <span className={'blueText'}>аккаунт</span></>,
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