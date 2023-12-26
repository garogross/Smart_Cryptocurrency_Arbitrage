import {emailImage, passwordImage, userImage} from "../../assets/images";
import React from "react";
import {Link} from "react-router-dom";
import {loginPagePath} from "../../router/path";


export const formProps = () => ({
    title: <>Создание <span className={'blueText'}>аккаунта</span></>,
    fields: [
        {
            placeholder: "Никнейм",
            img: userImage,
            key: "username"
        },
        {
            type: 'email',
            placeholder: "E-mail",
            img: emailImage,
            key: "email"
        },
        {
            type: 'password',
            placeholder: "Пароль",
            img: passwordImage,
            key: "password"
        },
    ],
    btnText: "Создать аккаунт",
    link: <>
        У вас уже есть аккаунт? <Link to={loginPagePath} className="blueText">Войти</Link>
    </>,
})