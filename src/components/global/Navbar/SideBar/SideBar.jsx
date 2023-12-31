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
    adminNewsPagePath,
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
} from "../../../../assets/svg";
import {navLogoImage} from "../../../../assets/images";
import {arbitrageTypes, newsTypes, subscriptionTypes, telegramLink} from "../../../../constants";

const navLinks = [
    {
        title: "Arbitration News",
        icon: newsIcon,
        path: newsPagePath,
        adminPath: adminNewsPagePath,
        isPrivate: true,
        sublinks: [
            {
                title: 'Актуальные новости',
                href: newsTypes.actuals,
                isPrivate: true
            },
            {
                title: 'Прошедшие новости',
                href: newsTypes.latest,
                isPrivate: true
            },
            {
                title: 'News Free',
                href: newsTypes.free
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
                href: arbitrageTypes.cexToCex,
                isPrivate: true
            },
            {
                title: 'CEX — DEX Arbitrage',
                href: arbitrageTypes.cexToDex,
                isPrivate: true
            },
            {
                title: 'Arbitrage Free',
                href: arbitrageTypes.free,
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

function SideBar({burgerOpened, onCloseBurger, isMobile}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)
    const {pathname, hash} = location

    const onClickLoginLogout = () => {
        const clb = () => {
            navigate(loginPagePath)
            if(isMobile) onCloseBurger()
        }
        token ? dispatch(logOut(clb)) : navigate(loginPagePath)
    }

    const setActiveNavLinkClass = (defaultClass, activeClass) => {
        return ({isActive}) => (isActive ? `${defaultClass} ${activeClass}` : defaultClass)
    }

    const activeNavLinks = setActiveNavLinkClass(styles["sideBar__link"], styles["sideBar__link_active"])

    return (
        <>
            <Backdrop
                inProp={burgerOpened}
                onClose={onCloseBurger}
                enableScroll={true}
                className={styles["sideBar__backdrop"]}
            />
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
                    <Link to={mainPagePath} onClick={isMobile ? onCloseBurger : null}>
                        <img src={navLogoImage} alt="Logo" className={styles["sideBar__logoImage"]}/>
                    </Link>
                    <div className={`${styles["sideBar__menu"]} scrollbarDef`}>
                        {
                            navLinks
                                .filter(item => token || !item.isPrivate)
                                .map(({
                                          title,
                                          icon,
                                          path,
                                          adminPath,
                                          sublinks
                                      }, index) => {
                                        const linkPath = user?.role === "admin" && adminPath ? adminPath : path
                                        const isAuthenticated = token && user.subscription === subscriptionTypes.arb
                                        const filteredSubLinks = sublinks
                                            ?.filter(item => (
                                                user.role === 'admin' ||
                                                item.isPrivate && isAuthenticated ||
                                                !item.isPrivate
                                            ))

                                        const onClickLinks = (isNavLink) => {
                                            if (
                                                isMobile &&
                                                (!isNavLink ||
                                                    isNavLink && !sublinks || filteredSubLinks.length === 1)) onCloseBurger()
                                        }

                                        return (
                                            <Fragment key={index}>
                                                {index === navLinks.length - 1 ?
                                                    <b className={styles['sideBar__line']}/> : null}
                                                <NavLink
                                                    onClick={() => onClickLinks(true)}
                                                    to={`${linkPath}${filteredSubLinks ? "#" + filteredSubLinks[0].href : ""}`}
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
                                                        inProp={pathname.includes(linkPath)}
                                                        style={'height'}
                                                        height={'300px'}
                                                        className={styles['sideBar__acardeon']}
                                                    >
                                                        {
                                                            filteredSubLinks.map((item, index) => (
                                                                <Link
                                                                    key={index}
                                                                    onClick={() => onClickLinks()}
                                                                    to={`${linkPath}#${item.href}`}
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
                                    }
                                )
                        }
                    </div>
                    <div className={styles["sideBar__bottomBlock"]}>
                        <div className={styles["sideBar__socialIconsBlock"]}>

                            {/*<button className={styles["sideBar__socialBtn"]}>*/}
                            {/*    <Svg*/}
                            {/*        className={styles["sideBar__socialIcon"]}*/}
                            {/*        id={twitterIcon}*/}
                            {/*    />*/}
                            {/*</button>*/}

                            {/*<button className={styles["sideBar__socialBtn"]}>*/}
                            {/*    <Svg*/}
                            {/*        className={styles["sideBar__socialIcon"]}*/}
                            {/*        id={youtubeIcon}*/}
                            {/*    />*/}
                            {/*</button>*/}

                            <a
                                href={telegramLink}
                                target={"_blank"}
                                rel={'noreferrer'}
                                className={styles["sideBar__socialBtn"]}>
                                <Svg
                                    className={styles["sideBar__socialIcon"]}
                                    id={telegramIcon}
                                />
                            </a>
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