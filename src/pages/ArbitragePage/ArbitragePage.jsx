import React from 'react';
import ArbitragePageHeader from "../../components/ArbitragePage/ArbitragePageHeader/ArbitragePageHeader";
import ArbitragePageList from "../../components/ArbitragePage/ArbitragePageList/ArbitragePageList";

function ArbitragePage(props) {
    return (
        <div className={'gradientBg'}>
            <div className="container">
                <ArbitragePageHeader/>
                <ArbitragePageList/>
            </div>
        </div>
    );
}

export default ArbitragePage;