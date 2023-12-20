import React from 'react';
import styles from "./ArbitragePageList.module.scss"
import ArbitragePageListItem from "./ArbitragePageListItem/ArbitragePageListItem";

function ArbitragePageList(props) {
    return (
            <div className={styles["arbitrageList"]}>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
                <ArbitragePageListItem/>
            </div>
    );
}

export default ArbitragePageList;