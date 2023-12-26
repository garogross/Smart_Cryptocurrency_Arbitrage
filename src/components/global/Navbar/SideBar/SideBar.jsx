import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../../redux/action/auth";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";

import Svg from "../../../layout/Svg/Svg";
import TransitionProvider from "../../../../providers/TransitionProvider";
import Backdrop from "../../../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../../../providers/NewPortalProvider";

import styles from "./SideBar.module.scss"
import {
    arbitragePagePath, loginPagePath, mainPagePath,
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
import {navLogoImage} from "../../../../assets/images";
import {subscriptionTypes} from "../../../../constants";

const navLinks = [
    {
        title: "Arbitration News",
        icon: newsIcon,
        path: newsPagePath,
        isPrivate: true,
        sublinks: [
            {
                title: 'Актуальные новости',
                href: 'actuals',
                isPrivate: true
            },
            {
                title: 'Прошедшие новости',
                href: 'latest',
                isPrivate: true
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
        isPrivate: true,
        sublinks: [
            {
                title: 'CEX — CEX Arbitrage',
                href: 'cex-dex',
                isPrivate: true
            },
            {
                title: 'DEX — DEX Arbitrage',
                href: 'dex-dex',
                isPrivate: true
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
        isPrivate: true
    },
    {
        title: "Support",
        icon: supportIcon,
        path: supportPagePath,
    },
]

function SideBar({burgerOpened, onCloseBurger}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    const {pathname, hash} = location

    const onClickLoginLogout = () => {
        const clb = () => navigate(loginPagePath)
        token ? dispatch(logOut(clb)) : navigate(loginPagePath)
        onCloseBurger()
    }

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
                    <Link to={mainPagePath} onClick={onCloseBurger}>
                        <img src={navLogoImage} alt="Logo" className={styles["sideBar__logoImage"]}/>
                    </Link>
                    <div className={`${styles["sideBar__menu"]} scrollbarDef`}>
                        {
                            navLinks.filter(item => token || !item.isPrivate).map(({
                                                                                       title,
                                                                                       icon,
                                                                                       path,
                                                                                       sublinks
                                                                                   }, index) => (
                                    <Fragment key={index}>
                                        {index === navLinks.length - 1 ? <b className={styles['sideBar__line']}/> : null}
                                        <NavLink
                                            onClick={!sublinks ? onCloseBurger : null}
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
                                                    sublinks
                                                        .filter(item => (token && user.subscription === subscriptionTypes.arb) || !item.isPrivate)
                                                        .map((item, index) => (
                                                            <Link
                                                                onClick={onCloseBurger}
                                                                key={index}
                                                                to={`${path}#${item.href}`}
                                                                className={`${styles["sideBar__acardeonItem"]} ${hash.includes(item.href) ? styles["sideBar__acardeonItem_active"] : ""}`}>
                                                                <span
                                                                    className={styles["sideBar__acardeonItemLine"]}></span>
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
                        <button
                            className={styles["sideBar__logoutBtn"]}
                            onClick={onClickLoginLogout}
                        >
                            <Svg
                                className={styles["sideBar__logoutIcon"]}
                                id={logOutIcon}
                            />
                            <span className={styles["sideBar__logoutText"]}>{token ? 'Logout' : 'Log In'}</span>
                        </button>
                    </div>
                </TransitionProvider>
            </NewPortalProvider>
        </>
    );
}

export default SideBar;