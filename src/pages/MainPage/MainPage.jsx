import React from 'react';
import MainPageHeader from "../../components/MainPage/MainPageHeader/MainPageHeader";
import MainPageArbitrageBot from "../../components/MainPage/MainPageArbitrageBot/MainPageArbitrageBot";
import MainPageArbitrageScanner from "../../components/MainPage/MainPageArbitrageScanner/MainPageArbitrageScanner";
import MainPageArbitrageNews from "../../components/MainPage/MainPageArbitrageNews/MainPageArbitrageNews";
import MainPageCommunity from "../../components/MainPage/MainPageCommunity/MainPageCommunity";
import MainPagePricing from "../../components/MainPage/MainPagePricing/MainPagePricing";
import MainPageSignin from "../../components/MainPage/MainPageSignin/MainPageSignin";

import styles from "./MainPage.module.scss"
import MainPageRegisterPopup from "../../components/MainPage/MainPageRegisterPopup/MainPageRegisterPopup";

function MainPage() {
    return (
        <div className={styles['main']}>
            <MainPageHeader/>
            <div className={'container'}>
                <MainPageArbitrageBot/>
                <MainPageArbitrageScanner/>
                <MainPageArbitrageNews/>
                <MainPageCommunity/>
                <MainPagePricing/>
            </div>
            <MainPageSignin/>
            <MainPageRegisterPopup/>
        </div>
    );
}

export default MainPage;