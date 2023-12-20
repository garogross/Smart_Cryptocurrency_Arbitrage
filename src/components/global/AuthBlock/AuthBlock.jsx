import React from 'react';
import styles from "./AuthBlock.module.scss"
import {
    authBlockLogoImage,
} from "../../../assets/images";
import MainBtn from "../../layout/MainBtn/MainBtn";
import Svg from "../../layout/Svg/Svg";
import {errorIcon} from "../../../assets/svg";
import MainInput from "../../layout/MainInput/MainInput";

function AuthBlock({title,fields,btnText,link,error}) {
    return (
        <div>
            <div className={styles["authBlock"]}>
                <div className={styles["authBlock__image"]}></div>
                <div className={styles["authBlock__main"]}>
                    <div className={styles["authBlock__mainContainer"]}>
                        <img src={authBlockLogoImage} alt="Logo" className={styles["authBlock__logoImg"]}/>
                        <h3 className={styles["authBlock__title"]}>{title}</h3>
                        <form action="" method='POST' className={styles["authBlock__form"]}>
                            {
                                fields.map(({type,placeholder,img},index) => (
                                    <MainInput
                                        key={index}
                                        type={type || "text"}
                                        className={styles["authBlock__input"]}
                                        placeholder={placeholder}
                                        icon={img}
                                    />
                                ))
                            }
                            <MainBtn className={styles["authBlock__submitBtn"]} type={"submit"}>
                                {btnText}
                            </MainBtn>
                        </form>
                        <p className={styles["authBlock__linkText"]}>{link}</p>

                    </div>
                    {
                        error ?
                            <div className={styles["authBlock__errorBox"]}>
                                <Svg className={styles["authBlock__errorIcon"]} id={errorIcon}/>
                                <p className={styles["authBlock__errorBoxText"]}>{error}</p>
                            </div>
                            : null
                    }

                </div>
            </div>
        </div>
    );
}

export default AuthBlock;