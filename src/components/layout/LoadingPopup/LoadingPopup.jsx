import React from 'react';

import styles from "./LoadingPopup.module.scss"
import Backdrop from "../Backdrop/Backdrop";
import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider from "../../../providers/TransitionProvider";
import Loader from "../Loader/Loader";

function LoadingPopup({show}) {
    return (
        <>
            <Backdrop inProp={show}/>
            <NewPortalProvider>
                <TransitionProvider
                    className={styles["loadingPopup"]}
                    inProp={show}
                    style={'opacity'}
                >
                    <Loader/>
                </TransitionProvider>
            </NewPortalProvider>
        </>
);
}

export default LoadingPopup;