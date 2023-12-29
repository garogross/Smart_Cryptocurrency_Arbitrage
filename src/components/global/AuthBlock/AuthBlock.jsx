import React from 'react';
import styles from "./AuthBlock.module.scss"
import {
    authBlockLogoImage,
} from "../../../assets/images";
import MainBtn from "../../layout/MainBtn/MainBtn";
import Svg from "../../layout/Svg/Svg";
import {errorIcon} from "../../../assets/svg";
import MainInput from "../../layout/MainInput/MainInput";
import {useFormValue} from "../../../hooks/useFormValue";
import LoadingPopup from "../../layout/LoadingPopup/LoadingPopup";

function AuthBlock({
                       title,
                       fields,
                       btnText,
                       link,
                       error,
                       onSubmit,
                       loading
                   }) {
    const initialState = fields.reduce((acc, cur) => {
        acc[cur.key] = ""
        return acc;
    }, {})
    const {formData, onChange} = useFormValue(initialState)

    const onSubmitForm = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }


    let errorText = error || ""

    if (error) {
        const invalidField = fields.find(item => error.includes(item.key))

        if (invalidField?.placeholder) {
            errorText = error.replace(invalidField.key, invalidField.placeholder)
        }
    }


    return (
        <>
            <div className={styles["authBlock"]}>
                <div className={styles["authBlock__imageBlock"]}>
                </div>
                <div className={styles["authBlock__main"]}>
                    <div className={styles["authBlock__mainContainer"]}>
                        <img src={authBlockLogoImage} alt="Logo" className={styles["authBlock__logoImg"]}/>
                        <h3 className={styles["authBlock__title"]}>{title}</h3>
                        <form
                            autoComplete={'off'}
                            method='POST'
                            className={styles["authBlock__form"]}
                            onSubmit={onSubmitForm}
                        >
                            <input type="hidden" autoComplete="false"/>
                            {
                                fields.map(({type, placeholder, img, key}, index) => (
                                    <MainInput
                                        key={index}
                                        type={type || "text"}
                                        className={styles["authBlock__input"]}
                                        placeholder={placeholder}
                                        icon={img}
                                        value={formData[key]}
                                        name={key}
                                        onChange={onChange}
                                    />
                                ))
                            }
                            <MainBtn className={styles["authBlock__submitBtn"]} type={"submit"}>
                                {btnText}
                            </MainBtn>
                        </form>
                        <p className={styles["authBlock__linkText"]}>{link}</p>

                    </div>

                    <div
                        className={`${styles["authBlock__errorBlock"]} ${error ? styles["authBlock__errorBlock_active"] : ''}`}>
                        <div className={styles["authBlock__errorBox"]}>
                            <Svg className={styles["authBlock__errorIcon"]} id={errorIcon}/>
                            <p className={styles["authBlock__errorBoxText"]}>{errorText}</p>
                        </div>
                    </div>
                </div>
            </div>
            <LoadingPopup show={loading}/>
        </>
    );
}

export default AuthBlock;