import React from 'react';
import styles from "./MainPagePricing.module.scss"
import SubscriptionBlock from "../../global/SubscriptionBlock/SubscriptionBlock";

function MainPagePricing() {
    return (
        <div>
            <div className={styles["pricing"]}>
                <h2 className={`${styles["pricing__title"]} titleTxt`}>Pricing</h2>
                <SubscriptionBlock/>
            </div>
        </div>
    );
}

export default MainPagePricing;