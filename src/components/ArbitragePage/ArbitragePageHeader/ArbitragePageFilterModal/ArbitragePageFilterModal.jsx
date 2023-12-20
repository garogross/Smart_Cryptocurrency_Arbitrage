import React from 'react';
import {useFormValue} from "../../../../hooks/useFormValue";

import styles from "./ArbitragePageFilterModal.module.scss"
import MainBtn from "../../../layout/MainBtn/MainBtn";
import MainInput from "../../../layout/MainInput/MainInput";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";

const filters = [
    {
        type: 'checkbox',
        key: 'type',
        name: 'Type',
        options: ['CEX to CEX', 'DEX to CEX'],
    },
    {
        type: 'checkbox',
        key: 'exchanges',
        name: 'Exchanges',
        options: ['Blockchain', 'Bitfinex', 'Bybit', 'Gate', 'HTX', 'KuCoin', 'OKX', 'MEXC', 'Poloniex'],
        selectedOptions: ['Blockchain', 'Bitfinex', 'Bybit'],
    },
    {
        type: 'checkbox',
        key: 'blockchain',
        name: 'Blockchain',
        options: ['Arbitrum', 'BSC', 'Ethereum', 'Polygon'],
    },
    {
        type: 'input',
        key: 'priceMonitoring',
        name: 'Мониторинг цены',
        label: 'Установите значение желаемой прибыли',
    },
    {
        type: 'input',
        key: 'minVolume',
        name: 'Min Обьем',
        value: '5'
    },
    {
        type: 'input',
        key: 'maxVolume',
        name: 'Max Обьем',
        value: '5'
    },
    {
        type: 'input',
        key: 'timeMinLimit',
        name: 'Ограничение времени пропуска сделки (min)',
    },
]

function ArbitragePageFilterModal({show, onClose}) {
    const initialData = filters.reduce((acc, cur) => {
        acc[cur.key] = cur.type === 'checkbox' ? cur.selectedOptions || [] : cur.value || ''
        return acc
    }, {})

    const {onChange, formData,setFormData} = useFormValue(initialData)

    const onToggleCheckBox = (e) => {
        const {name,value} = e.target
        console.log(formData[name].includes(value))
        setFormData(prevState => ({
            ...prevState,
            [name]: prevState[name].includes(value) ?
                prevState[name].filter(filterItem => filterItem !== value) :
                [...prevState[name],value]
        }))
    }

    return (
        <>
            <Backdrop inProp={show} onClose={onClose}/>
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
                    <div className={`${styles["filterModal__container"]} scrollbarDef`}>
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
                                                options.map((option,optionIndex) => (
                                                    <div key={optionIndex}>
                                                        <input
                                                            name={key}
                                                            onChange={onToggleCheckBox}
                                                            value={option}
                                                            id={`${key}-${option}`}
                                                            type="checkbox"
                                                            checked={formData[key].includes(option)}
                                                            className={styles['filterModal__checkbox__input']}/>
                                                        <label
                                                            htmlFor={`${key}-${option}`}
                                                            className={`${styles['filterModal__checkbox__label']}`}
                                                        >{option}</label>
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
                            className={styles['filterModal__btn']}
                        >Создать фильтр</MainBtn>
                    </div>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default ArbitragePageFilterModal;