import React from 'react';
import styles from "./SubscribtionPageContainer.module.scss"
import SubscriptionBlock from "../../global/SubscriptionBlock/SubscriptionBlock";

function SubscribtionPageContainer() {
    return (
        <div className={styles["subscribtionContainer"]}>
            <h5 className={`${styles["subscribtionContainer__title"]} pageRouteTitle`}>Главная > Subscription</h5>
            <SubscriptionBlock/>
        </div>
    );
}

export default SubscribtionPageContainer;