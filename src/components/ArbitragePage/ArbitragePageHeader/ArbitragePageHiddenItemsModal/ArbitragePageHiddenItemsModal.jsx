import React from 'react';
import {crossIcon} from "../../../../assets/svg";
import Svg from "../../../layout/Svg/Svg";
import NewPortalProvider from "../../../../providers/NewPortalProvider";
import TransitionProvider from "../../../../providers/TransitionProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";

import styles from "./ArbitragePageHiddenItemsModal.module.scss"
import CrossBtn from "../../../layout/CrossBtn/CrossBtn";

function ArbitragePageHiddenItemsModal({show, onClose,title,data,onRemove}) {
    return (
        <>
            <Backdrop inProp={show} onClose={onClose}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={styles["hiddenItemsModal"]}
                    style={'opacity'}
                    inProp={show}
                >
                    <CrossBtn onClick={onClose}/>
                    <h4 className={styles["hiddenItemsModal__title"]}>{title}</h4>
                    <div className={styles["hiddenItemsModal__container"]}>
                        {
                            data.map((item) => (
                                <div
                                    key={item}
                                    className={styles["hiddenItemsModal__item"]}
                                >
                                    <p className={styles["hiddenItemsModal__itemText"]}>{item}</p>
                                    <button
                                        className={styles["hiddenItemsModal__itemRemoveBtn"]}
                                        onClick={() => onRemove(item)}
                                    >
                                        <Svg className={styles["hiddenItemsModal__itemRemoveIcon"]} id={crossIcon}/>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default ArbitragePageHiddenItemsModal;