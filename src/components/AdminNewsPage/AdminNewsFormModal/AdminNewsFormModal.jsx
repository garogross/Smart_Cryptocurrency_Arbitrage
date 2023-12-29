import React from 'react';
import styles from "./AdminNewsFormModal.module.scss"
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import Backdrop from "../../layout/Backdrop/Backdrop";
import CrossBtn from "../../layout/CrossBtn/CrossBtn";
import MainInput from "../../layout/MainInput/MainInput";
import {useFormValue} from "../../../hooks/useFormValue";
import {newsTypes} from "../../../constants";
import Select from "../../layout/Select/Select";
import MainBtn from "../../layout/MainBtn/MainBtn";
import Svg from "../../layout/Svg/Svg";
import {deleteIcon} from "../../../assets/svg";
import {useDispatch} from "react-redux";
import {deleteNews} from "../../../redux/action/news";

function AdminNewsFormModal({
                                item,
                                onClose,
                                onSubmit,
                                title,
                                error,
                                loading
                            }) {
    const dispatch = useDispatch()
    const {formData, onChange, setFormData} = useFormValue({
        title: item?.title || "",
        body: item?.body || "",
        type: item?.type || newsTypes.free,
        tag: item?.tag || "",
        picture: item?.picture || "",
    })

    const onUploadImg = (e) => {
        setFormData(prevState => ({
            ...prevState,
            picture: e.target.files[0]
        }))
    }


    const onSubmitForm = e => {
        e.preventDefault()
        onSubmit(formData, onClose)
    }

    const onDelete = () => {
        dispatch(deleteNews(item?.id, onClose))
    }

    const selectValues = Object.values(newsTypes).map(item => ({
        value: item,
        item: item[0].toUpperCase() + item.slice(1)
    }))

    let errorText = error?.message || error || ""


    return (
        <>
            <Backdrop inProp={item} onClose={onClose} highZIndex={true}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={`${styles["adminNewsFormModal"]} scrollbarDef`}
                    style={'opacity'}
                    inProp={item}
                >
                    {
                        item?.id ?
                        <button
                            onClick={onDelete}
                            className={styles['adminNewsFormModal__deleteBtn']}
                        >
                            <Svg id={deleteIcon} className={styles['adminNewsFormModal__deleteIcon']}/>
                        </button> : null
                    }
                    <h2 className={`${styles["adminNewsFormModal__title"]}`}>{title}</h2>
                    <form
                        className={styles["adminNewsFormModal__contentBlock"]}
                        method={'POST'}
                        encType="multipart/form-data"
                        onSubmit={onSubmitForm}
                    >
                        {
                            Object.keys(formData).map((item, index) => {

                                const isPicture = item === "picture"

                                return (
                                    <label
                                        className={styles["adminNewsFormModal__label"]}
                                        htmlFor={item}
                                        key={index}
                                    >
                                        <p className={styles["adminNewsFormModal__labelText"]}>{item[0].toUpperCase() + item.slice(1)}</p>
                                        {
                                            item === 'type' ?
                                                <Select
                                                    disableState={loading}
                                                    className={styles["adminNewsFormModal__select"]}
                                                    valuesArr={selectValues}
                                                    selectedValueProp={selectValues.find(item => item.value === formData.type) || null}
                                                    onChange={(value) => setFormData(prevState => ({
                                                        ...prevState,
                                                        type: value
                                                    }))}
                                                    name={'Пусто'}
                                                /> :
                                                <MainInput
                                                    disabled={loading}
                                                    type={isPicture ? "file" : 'text'}
                                                    onChange={(e) => isPicture ? onUploadImg(e) : onChange(e)}
                                                    name={item}
                                                    value={isPicture ? undefined : formData[item]}
                                                    id={item}
                                                />}
                                    </label>
                                )
                            })
                        }
                        <TransitionProvider
                            inProp={error}
                            style={'height'}
                            height={'50px'}
                            className={styles["adminNewsFormModal__errorBlock"]}
                        >
                            <p
                                className={styles['adminNewsFormModal__errorBlockText']}
                            >{errorText}</p>
                        </TransitionProvider>
                        <MainBtn
                            type={'submit'}
                            disabled={loading}
                        >Сохранить</MainBtn>
                    </form>
                    <CrossBtn
                        onClick={onClose}
                        iconClassName={styles['adminNewsFormModal__crossIcon']}
                    />
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default AdminNewsFormModal;