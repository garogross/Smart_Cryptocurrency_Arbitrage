import React from 'react';
import ArbitragePageHeader from "../../components/ArbitragePage/ArbitragePageHeader/ArbitragePageHeader";
import ArbitragePageList from "../../components/ArbitragePage/ArbitragePageList/ArbitragePageList";
import {useSelector} from "react-redux";
import {subscriptionTypes} from "../../constants";

function ArbitragePage() {
    const user = useSelector(state => state.auth.user)
    return (
        <div className={'gradientBg'}>
            <div className="container">
                {user?.subscription === subscriptionTypes.arb ? <ArbitragePageHeader/> : null}
                <ArbitragePageList/>
            </div>
        </div>
    );
}

export default ArbitragePage;