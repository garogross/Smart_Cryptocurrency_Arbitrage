import React, {useMemo, useState} from 'react';
import {editEmailImage, editUsernameImage, passwordKeyImage} from "../../../assets/images";

import styles from "./SettingsPageBlock.module.scss"
import SettingsForm from "./SettingsForm/SettingsForm";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, changeUserData, onUserSubscribe} from "../../../redux/action/auth";
import {getLSItem, removeLSItem, setLSItem} from "../../../utils/functions/localStorage";
import {lsProps} from "../../../utils/lsProps";
import {subscribePush} from "../../../utils/functions/pushNotification";

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
        initialValue: user?.username || ""
    },
])

function SettingsPageBlock() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const changePasswordLoading = useSelector(state => state.auth.changePasswordLoading)
    const changePasswordError = useSelector(state => state.auth.changePasswordError)
    const editDataLoading = useSelector(state => state.auth.editDataLoading)
    const editDataError = useSelector(state => state.auth.editDataError)
    const [isNotificationsActive,setIsNotificationsActive] = useState(getLSItem(lsProps.usePushNot,true))

    const toggleNotificationsActivity = () => {
        if(isNotificationsActive) {
            const pushendpoint = getLSItem(lsProps.pushendpoint,true)
            const payload = user.push_subscription.filter(item => item.endpoint !== pushendpoint)
            const onSuccess = () => {
                removeLSItem(lsProps.pushendpoint)
                setLSItem(lsProps.usePushNot,false)
                setIsNotificationsActive(false)
            }

            dispatch(
                changeUserData(
                    {push_subscription: payload},
                    false,
                    onSuccess
            ))
        } else {
            let usePush = getLSItem(lsProps.usePushNot, true)
            subscribePush((sub) => dispatch(
                onUserSubscribe(sub,usePush,() => setIsNotificationsActive(true)))

            )
        }

    }

    const onChangePassword = (formData,clb) => {
        dispatch(changePassword({...formData,email: user.email},clb))
    }

    const onEditUserData = (formData,clb) => {
        dispatch(changeUserData(formData,true,clb))
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
                                    onSubmit={onEditUserData}
                                    error={editDataError}
                                    loading={editDataLoading}
                                    submitSuccessText={'Данные обновлены.'}
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