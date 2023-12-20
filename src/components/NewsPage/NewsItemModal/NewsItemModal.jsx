import React from 'react';
import styles from "./NewsItemModal.module.scss"
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import Backdrop from "../../layout/Backdrop/Backdrop";
import CrossBtn from "../../layout/CrossBtn/CrossBtn";

function NewsItemModal({item, onClose}) {
    return (
        <>
            <Backdrop inProp={item} onClose={onClose}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={`${styles["newsItemModal"]}`}
                    style={'opacity'}
                    inProp={item}
                >
                    <h2 className={`subtitleTxt`}>{item?.title}</h2>
                    <h2 className={`${styles["newsItemModal__title"]}`}>{item?.title}</h2>
                    <div className={`${styles["newsItemModal__contentBlock"]} scrollbarDef`}>
                        <div className={styles["newsItemModal__imageBlock"]}>
                            <img src={item?.picture} alt="Arbitrage News" className={styles["newsItemModal__img"]}/>
                        </div>
                        <p className={`${styles["newsItemModal__text"]} contentTxt`}>{item?.description}</p>
                        <CrossBtn onClick={onClose}/>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default NewsItemModal;