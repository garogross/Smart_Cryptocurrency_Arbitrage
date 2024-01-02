import {emailImage, passwordImage} from "../../assets/images";
import React from "react";
import {Link} from "react-router-dom";
import {forgotPasswordPagePath} from "../../router/path";


export const formProps = () =>  ({
    title: <>Новый <span className={'blueText'}>пароль</span></>,
    fields: [
        {
            placeholder: "Код активаций",
            img: emailImage,
            key: 'activation_code'
        },
        {
            placeholder: "Новый пароль",
            img: passwordImage,
            key: 'password'
        },
    ],
    btnText: "Отправить",
    link: <>
        Вернуться <Link to={forgotPasswordPagePath} className="blueText">назад</Link>
    </>,
})