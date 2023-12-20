import React from 'react';
import SettingsPageBlock from "../../components/SettingsPage/SettingsPageBlock/SettingsPageBlock";

function SettingsPage(props) {
    return (
        <div className={'gradientBg'}>
            <div className="container">
                <SettingsPageBlock/>
            </div>
        </div>
    );
}

export default SettingsPage;