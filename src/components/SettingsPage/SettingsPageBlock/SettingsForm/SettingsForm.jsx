import React, {memo, useEffect, useState} from 'react';
import MainInput from "../../../layout/MainInput/MainInput";
import {editEmailImage, editUsernameImage} from "../../../../assets/images";
import MainBtn from "../../../layout/MainBtn/MainBtn";
import styles from "./SettingsForm.module.scss";
import {useFormValue} from "../../../../hooks/useFormValue";

const SettingsForm = memo(({fields, onSubmit, loading, error, submitSuccessText}) => {

    const initialData = fields.reduce((acc, cur) => {
        acc[cur.key] = cur.initialValue || ""
        return acc
    }, {})
    const {formData, onChange} = useFormValue(initialData)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    let errorText = ""

    if (error) {
        const errorField = fields.find(item => error.includes(item.key))
        errorText = errorField ? error.replace(errorField.key, errorField.placeholder) : error
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        const onSuccess = () => {
            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 3000)
        }
        onSubmit(formData, onSuccess)
    }

    return (
        <form
            method="POST"
            className={styles['settingsForm']}
            onSubmit={onSubmitForm}
        >
            {
                fields.map(({icon, placeholder, key, type}, index) => (
                    <MainInput
                        disabled={loading}
                        key={index}
                        icon={icon}
                        value={formData[key]}
                        name={key}
                        onChange={onChange}
                        type={type || 'text'}
                        placeholder={placeholder}
                        className={styles["settingsForm__input"]}
                    />
                ))
            }
            <p className={`${styles["settingsForm__notText"]} ${styles["settingsForm__notText_fail"]} ${error ? styles["settingsForm__notText_active"] : ""}`}>{errorText}</p>
            <p className={`${styles["settingsForm__notText"]} ${styles["settingsForm__notText_success"]} ${submitSuccess ? styles["settingsForm__notText_active"] : ""}`}>{submitSuccessText}</p>
            <MainBtn
                disabled={loading}
                type={'submit'}
                className={styles["settingsForm__btn"]}
            >Сохранить</MainBtn>
        </form>
    );
})

export default SettingsForm;