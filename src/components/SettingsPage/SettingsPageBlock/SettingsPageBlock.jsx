import React, {useState} from 'react';
import MainInput from "../../layout/MainInput/MainInput";
import {editEmailImage, editUsernameImage, passwordKeyImage} from "../../../assets/images";
import MainBtn from "../../layout/MainBtn/MainBtn";

import styles from "./SettingsPageBlock.module.scss"

function SettingsPageBlock(props) {
    const [isNotificationsActive,setIsNotificationsActive] = useState(false)

    const toggleNotificationsActivity = () => setIsNotificationsActive(prevState => !prevState)

    return (
            <div className={styles["settingsBlock"]}>
                <h5 className={`${styles["settingsBlock__routeTitle"]} pageRouteTitle`}>Главная > Settings</h5>
                <div className={styles["settingsBlock__main"]}>
                    <div className={styles["settingsBlock__mainTopBlock"]}>
                        <div className={styles["settingsBlock__box"]}>
                            <h6 className={styles["settingsBlock__boxSubtitle"]}>Смена данных</h6>
                            <h4 className={styles["settingsBlock__boxTitle"]}>Общие</h4>
                            <form method="POST">
                                <MainInput
                                    icon={editEmailImage}
                                    placeholder="Email"
                                    className={styles["settingsBlock__boxinput"]}
                                />
                                <MainInput
                                    icon={editUsernameImage}
                                    placeholder="Имя пользователя"
                                    className={styles["settingsBlock__boxinput"]}
                                />
                                <MainBtn
                                    className={styles["settingsBlock__boxBtn"]}
                                >Сохранить</MainBtn>
                            </form>
                        </div>
                        <div className={styles["settingsBlock__box"]}>
                            <h6 className={styles["settingsBlock__boxSubtitle"]}>Смена пароля</h6>
                            <h4 className={styles["settingsBlock__boxTitle"]}>Безопасность</h4>
                            <form method="POST">
                                <MainInput
                                    icon={passwordKeyImage}
                                    placeholder="Старый пароль"
                                    className={styles["settingsBlock__boxinput"]}
                                />
                                <MainInput
                                    icon={passwordKeyImage}
                                    placeholder="Новый пароль"
                                    className={styles["settingsBlock__boxinput"]}
                                />
                                <MainBtn
                                    className={styles["settingsBlock__boxBtn"]}
                                >Сохранить</MainBtn>
                            </form>
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
                                className={`${styles["settingsBlock__notificationBlockBtn"]} ${ isNotificationsActive ? styles["settingsBlock__notificationBlockBtn_active"] : ""}`}
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default SettingsPageBlock;