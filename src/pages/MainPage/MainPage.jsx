import React from 'react';
import MainPageHeader from "../../components/MainPage/MainPageHeader/MainPageHeader";
import MainPageArbitrageBot from "../../components/MainPage/MainPageArbitrageBot/MainPageArbitrageBot";
import MainPageArbitrageScanner from "../../components/MainPage/MainPageArbitrageScanner/MainPageArbitrageScanner";
import MainPageArbitrageNews from "../../components/MainPage/MainPageArbitrageNews/MainPageArbitrageNews";
import MainPageCommunity from "../../components/MainPage/MainPageCommunity/MainPageCommunity";
import MainPagePricing from "../../components/MainPage/MainPagePricing/MainPagePricing";
import MainPageSignin from "../../components/MainPage/MainPageSignin/MainPageSignin";

function MainPage(props) {
    return (
        <div>
            <MainPageHeader/>
            <div className={'container'}>
                <MainPageArbitrageBot/>
                <MainPageArbitrageScanner/>
                <MainPageArbitrageNews/>
                <MainPageCommunity/>
                <MainPagePricing/>
            </div>
            <MainPageSignin/>
        </div>
    );
}

export default MainPage;