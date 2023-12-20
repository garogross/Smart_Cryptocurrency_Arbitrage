import React, {Fragment} from 'react';
import Svg from "../../../layout/Svg/Svg";

import styles from "./SideBar.module.scss"
import {
    arbitragePagePath, mainPagePath,
    newsPagePath,
    settingsPagePath,
    subscribtionPagePath,
    supportPagePath
} from "../../../../router/path";
import {
    arbitrageIcon, arrowDownIcon, arrowIcon, logOutIcon, newsIcon,
    settingsIcon,
    subscriptionIcon,
    supportIcon, telegramIcon,
    twitterIcon,
    youtubeIcon
} from "../../../../assets/svg";
import {Link, NavLink, useLocation} from "react-router-dom";
import {navLogoImage} from "../../../../assets/images";
import TransitionProvider from "../../../../providers/TransitionProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../../providers/NewPortalProvider";

const navLinks = [
    {
        title: "Arbitration News",
        icon: newsIcon,
        path: newsPagePath,
        sublinks: [
            {
                title: 'Актуальные новости',
                href: 'actuals'
            },
            {
                title: 'Прошедшие новости',
                href: 'latest'
            },
            {
                title: 'News Free',
                href: 'newsFree'
            },
        ]
    },
    {
        title: "Arbitrage",
        icon: arbitrageIcon,
        path: arbitragePagePath,
        sublinks: [
            {
                title: 'CEX — CEX Arbitrage',
                href: 'cex-dex'
            },
            {
                title: 'DEX — DEX Arbitrage',
                href: 'dex-dex'
            },
            {
                title: 'Arbitrage Free',
                href: 'arbitrageFree'
            },
        ]
    },
    {
        title: "Subscription",
        icon: subscriptionIcon,
        path: subscribtionPagePath,
    },
    {
        title: "Settings",
        icon: settingsIcon,
        path: settingsPagePath,
    },
    {
        title: "Support",
        icon: supportIcon,
        path: supportPagePath,
    },
]

function SideBar({burgerOpened, onCloseBurger}) {
    const location = useLocation()

    const {pathname, hash} = location
    const setActiveNavLinkClass = (defaultClass, activeClass) => {
        return ({isActive}) => (isActive ? `${defaultClass} ${activeClass}` : defaultClass)
    }

    const activeNavLinks = setActiveNavLinkClass(styles["sideBar__link"], styles["sideBar__link_active"])
    return (
        <>
            <Backdrop inProp={burgerOpened} onClose={onCloseBurger}/>
            <NewPortalProvider>
                <TransitionProvider
                    inProp={burgerOpened}
                    style={'left'}
                    className={styles["sideBar"]}
                >
                    <button
                        className={styles["sideBar__closeBtn"]}
                        onClick={onCloseBurger}
                    >
                        <Svg
                            className={styles["sideBar__closeIcon"]}
                            id={arrowIcon}
                        />
                    </button>
                    <Link to={mainPagePath}>
                        <img src={navLogoImage} alt="Logo" className={styles["sideBar__logoImage"]}/>
                    </Link>
                    <div className={`${styles["sideBar__menu"]} scrollbarDef`}>
                        {
                            navLinks.map(({title, icon, path, sublinks}, index) => (
                                    <Fragment key={index}>
                                        {index === navLinks.length - 1 ? <b className={styles['sideBar__line']}/> : null}
                                        <NavLink
                                            onClick={onCloseBurger}
                                            to={path}
                                            className={activeNavLinks}
                                        >
                                            <Svg className={styles["sideBar__linkIcon"]} id={icon}/>
                                            <span className={styles["sideBar__linkText"]}>{title}</span>
                                            {
                                                sublinks ?
                                                    <Svg
                                                        id={arrowDownIcon}
                                                        className={styles['sideBar__linkArrowIcon']}
                                                    /> : null
                                            }
                                        </NavLink>
                                        {sublinks ?
                                            <TransitionProvider
                                                duration={300}
                                                inProp={pathname.includes(path)}
                                                style={'height'}
                                                height={'300px'}
                                                className={styles['sideBar__acardeon']}
                                            >
                                                {
                                                    sublinks.map((item, index) => (
                                                        <Link
                                                            onClick={onCloseBurger}
                                                            key={index}
                                                            to={`${path}#${item.href}`}
                                                              className={`${styles["sideBar__acardeonItem"]} ${hash.includes(item.href) ? styles["sideBar__acardeonItem_active"] : ""}`}>
                                                            <span className={styles["sideBar__acardeonItemLine"]}></span>
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    ))
                                                }
                                            </TransitionProvider> : null
                                        }
                                    </Fragment>
                                )
                            )
                        }
                    </div>
                    <div className={styles["sideBar__bottomBlock"]}>
                        <div className={styles["sideBar__socialIconsBlock"]}>

                            <button className={styles["sideBar__socialBtn"]}>
                                <Svg
                                    className={styles["sideBar__socialIcon"]}
                                    id={twitterIcon}
                                />
                            </button>

                            <button className={styles["sideBar__socialBtn"]}>
                                <Svg
                                    className={styles["sideBar__socialIcon"]}
                                    id={youtubeIcon}
                                />
                            </button>

                            <button className={styles["sideBar__socialBtn"]}>
                                <Svg
                                    className={styles["sideBar__socialIcon"]}
                                    id={telegramIcon}
                                />
                            </button>
                        </div>
                        <button className={styles["sideBar__logoutBtn"]}>
                            <Svg
                                className={styles["sideBar__logoutIcon"]}
                                id={logOutIcon}
                            />
                            <span className={styles["sideBar__logoutText"]}>Logout</span>
                        </button>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default SideBar;