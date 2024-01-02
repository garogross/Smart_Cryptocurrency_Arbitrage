import {emailImage} from "../../assets/images";
import React from "react";
import {Link} from "react-router-dom";
import { loginPagePath} from "../../router/path";


export const formProps = () =>  ({
    title: <>Сброс <span className={'blueText'}>пароля</span></>,
    fields: [
        {
            placeholder: "E-mail",
            img: emailImage,
            key: 'email'
        },
    ],
    btnText: "Отправить",
    link: <>
        Вернуться <Link to={loginPagePath} className="blueText">назад</Link>
    </>,
})