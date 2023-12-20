import React from 'react';
import SubscribtionPageContainer
    from "../../components/SubscribtionPage/SubscribtionPageContainer/SubscribtionPageContainer";

function SubscribtionPage(props) {
    return (
        <div className={'gradientBg'}>
            <div className="container">
                <SubscribtionPageContainer/>
            </div>
        </div>
    );
}

export default SubscribtionPage;