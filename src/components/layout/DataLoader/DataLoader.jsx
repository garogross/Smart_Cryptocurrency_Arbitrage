import React from 'react';
import styles from "./DataLoader.module.scss";
import Loader from "../Loader/Loader";
import TransitionProvider from "../../../providers/TransitionProvider";
import {emptyIcon} from "../../../assets/svg";
import Svg from "../Svg/Svg";

function DataLoader({loading,isEmpty}) {
    return (
        <TransitionProvider
            inProp={loading || isEmpty}
            style={'opacity'}
            // height={'300px'}
            className={styles["dataLoader"]}
        >
            {
                loading ?
                    <Loader size={80} borderSize={8}/>
:
                    <Svg className={styles["dataLoader__emptyIcon"]} id={emptyIcon}/>
            }
        </TransitionProvider>
    );
}

export default DataLoader;