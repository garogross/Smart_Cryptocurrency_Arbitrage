import React from 'react';
import {useFormValue} from "../../../../hooks/useFormValue";

import styles from "./ArbitragePageFilterModal.module.scss"
import MainBtn from "../../../layout/MainBtn/MainBtn";
import MainInput from "../../../layout/MainInput/MainInput";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";
import {arbitrageTypes} from "../../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {eyeIcon} from "../../../../assets/svg";
import Svg from "../../../layout/Svg/Svg";
import {changeUserData} from "../../../../redux/action/auth";
import {getArbitrage, requestArbitrage} from "../../../../redux/action/arbitrage";

const setFilters = (exchanges,filters) => {

    const setOptions = (arr) => arr.map(item => ({title: item[0].toUpperCase()+item.slice(1),value: item}))


    return [
        {
            type: 'checkbox',
            key: 'exchanges',
            name: 'Exchanges',
            options: setOptions(exchanges),
            selectedOptions: filters.exchanges || [],
        },
        {
            type: 'input',
            key: 'profit',
            name: 'Мониторинг цены',
            label: 'Установите значение желаемой прибыли',
            value: filters.profit,
        },
        {
            type: 'input',
            key: 'min_amount',
            name: 'Min Обьем',
            value: filters.min_amount
        },
        {
            type: 'input',
            key: 'max_amount',
            name: 'Max Обьем',
            value: filters.max_amount
        },
        {
            type: 'input',
            key: 'hidden_time',
            name: <><Svg id={eyeIcon}/> <span>Ограничение времени пропуска сделки (min)</span></>,
            value: filters.hidden_time
        },
    ]
}

function ArbitragePageFilterModal({show, onClose}) {
    const dispatch = useDispatch()
    const exchanges = useSelector(state => state.arbitrage.exchanges)
    const userFilters = useSelector(state => state.arbitrage.filters)
    const filters = setFilters(exchanges,userFilters)
    const initialData = filters.reduce((acc, cur) => {
        acc[cur.key] = cur.type === 'checkbox' ? cur.selectedOptions || [] : cur.value || ''
        return acc
    }, {})

    const {onChange, formData, setFormData} = useFormValue(initialData)

    const onToggleCheckBox = (e) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: prevState[name].includes(value) ?
                prevState[name].filter(filterItem => filterItem !== value) :
                [...prevState[name], value]
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const resData = Object.keys(formData).reduce((acc,cur) => {
            const value = Array.isArray(formData[cur]) || +formData[cur] == NaN ?
                formData[cur] : +formData[cur]
           acc[cur] = value
            return acc
        },{})
        const onSuccess = () => {
            dispatch(requestArbitrage())
            onClose()
        }

        dispatch(changeUserData(resData,false,onSuccess))
    }

    return (
        <>
            <Backdrop inProp={show} onClose={onClose} highZIndex={true}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={styles["filterModal"]}
                    inProp={show}
                    style={'right'}
                >
                    <CrossBtn
                        btnClassName={styles['filterModal__crossBtn']}
                        onClick={onClose}
                    />
                    <form
                        className={`${styles["filterModal__container"]} scrollbarDef`}
                        method={'POST'}
                        onSubmit={onSubmit}
                    >
                        {
                            filters.map(({
                                             key,
                                             type,
                                             name,
                                             options,
                                             selectedOptions,
                                             label,
                                             value,
                                         }, index) => (
                                <div
                                    key={index}
                                    className={styles["filterModal__item"]}
                                >
                                    <h6 className={`${styles["filterModal__title"]} ${label ? styles["filterModal__title_withLabel"] : ''}`}>{name}</h6>
                                    {label ? <p className={styles["filterModal__inputLabelText"]}>{label}</p> : ""}
                                    {
                                        type === 'checkbox' ?
                                            <div className={styles["filterModal__checkboxesList"]}>
                                                {
                                                    options.map(({title,value}, optionIndex) => (
                                                        <div key={optionIndex}>
                                                            <input
                                                                name={key}
                                                                onChange={onToggleCheckBox}
                                                                value={value}
                                                                id={`${key}-${value}`}
                                                                type="checkbox"
                                                                checked={formData[key].includes(value)}
                                                                className={styles['filterModal__checkbox__input']}/>
                                                            <label
                                                                htmlFor={`${key}-${value}`}
                                                                className={`${styles['filterModal__checkbox__label']}`}
                                                            >{title}</label>
                                                        </div>
                                                    ))
                                                }

                                            </div> :
                                            <MainInput
                                                type="number"
                                                className={styles["filterModal__input"]}
                                                value={formData[key]}
                                                name={key}
                                                onChange={onChange}
                                            />
                                    }
                                </div>
                            ))
                        }
                        <div className={styles["filterModal__btnsBlock"]}>
                            <MainBtn
                                onClick={onClose}
                                className={styles['filterModal__btn']}
                                isPassive={true}>Отменить</MainBtn>
                            <MainBtn
                                type={'submit'}
                                className={styles['filterModal__btn']}
                            >Создать фильтр</MainBtn>
                        </div>
                    </form>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default ArbitragePageFilterModal;