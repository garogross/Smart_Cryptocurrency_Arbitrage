import React, {useMemo, useState} from 'react';
import {editEmailImage, editUsernameImage, passwordKeyImage} from "../../../assets/images";

import styles from "./SettingsPageBlock.module.scss"
import SettingsForm from "./SettingsForm/SettingsForm";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../../redux/action/auth";

const changePassFields = [
    {
        icon: passwordKeyImage,
        placeholder: "Старый пароль",
        key: "old_password",
        type: "password"
    },
    {
        icon: passwordKeyImage,
        placeholder: "Новый пароль",
        key: "new_password",
        type: "password"
    },
]

const changeUserFields = (user)=>  ([
    {
        icon: editEmailImage,
        placeholder: "Email",
        key: "email",
        type: "email",
        initialValue: user?.email || ""
    },
    {
        icon: editUsernameImage,
        placeholder: "Имя пользователя",
        key: "username",
        initialValue: user?.user_name || ""
    },
])

function SettingsPageBlock() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const changePasswordLoading = useSelector(state => state.auth.changePasswordLoading)
    const changePasswordError = useSelector(state => state.auth.changePasswordError)
    const [isNotificationsActive, setIsNotificationsActive] = useState(false)

    const toggleNotificationsActivity = () => setIsNotificationsActive(prevState => !prevState)

    const onChangePassword = (formData,clb) => {
        dispatch(changePassword({...formData,email: user.email},clb))
    }

    const memoizedChangeUserFields = useMemo(() => changeUserFields(user),[user])

    return (
        <div className={styles["settingsBlock"]}>
            <h5 className={`${styles["settingsBlock__routeTitle"]} pageRouteTitle`}>Главная > Settings</h5>
            <div className={styles["settingsBlock__main"]}>
                <div className={styles["settingsBlock__mainTopBlock"]}>
                    <div className={styles["settingsBlock__box"]}>
                        <h6 className={styles["settingsBlock__boxSubtitle"]}>Смена данных</h6>
                        <h4 className={styles["settingsBlock__boxTitle"]}>Общие</h4>
                        {
                            user ?
                                <SettingsForm
                                    fields={memoizedChangeUserFields}
                                />  : null
                        }

                    </div>
                    <div className={styles["settingsBlock__box"]}>
                        <h6 className={styles["settingsBlock__boxSubtitle"]}>Смена пароля</h6>
                        <h4 className={styles["settingsBlock__boxTitle"]}>Безопасность</h4>
                        {
                            user ?
                                <SettingsForm
                                    fields={changePassFields}
                                    onSubmit={onChangePassword}
                                    error={changePasswordError}
                                    submitSuccessText={'Пароль обновлен.'}
                                    loading={changePasswordLoading}
                                /> : null
                        }

                    </div>
                </div>
                <div className={styles["settingsBlock__box"]}>
                    <h6 className={styles["settingsBlock__boxSubtitle"]}>Примечание: обязательно разрешайте
                        уведомления, когда браузер запрашивает ваше разрешение.</h6>
                    <h4 className={styles["settingsBlock__boxTitle"]}>Push-уведомления браузера</h4>
                    <div className={styles["settingsBlock__notificationBlock"]}>
                        <div>
                            <h6 className={styles["settingsBlock__notificationBlockTitle"]}>Арбитраж</h6>
                            <p className={styles["settingsBlock__notificationBlockText"]}>Получать уведомления
                                браузера о новых возможностях арбитража.</p>
                        </div>
                        <button
                            onClick={toggleNotificationsActivity}
                            className={`${styles["settingsBlock__notificationBlockBtn"]} ${isNotificationsActive ? styles["settingsBlock__notificationBlockBtn_active"] : ""}`}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPageBlock;