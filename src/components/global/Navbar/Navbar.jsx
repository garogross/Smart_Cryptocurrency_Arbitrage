import React, {useEffect, useState} from 'react';
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";

function Navbar() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const isDesk = screenWidth > 768
    const [burgerOpened,setBurgerOpened] = useState(isDesk)
    useEffect(() => {
        if(burgerOpened) document.body.classList.add('navbarOpened')
        else document.body.classList.remove('navbarOpened')
    }, [burgerOpened]);

    const onOpenBurger = () => setBurgerOpened(true)
    const onCloseBurger = () => setBurgerOpened(false)

    return (
        <>
            <TopBar
                burgerOpened={burgerOpened}
                onOpenBurger={onOpenBurger}
            />
            <SideBar
                burgerOpened={burgerOpened}
                onCloseBurger={onCloseBurger}
                isMobile={!isDesk}
            />
        </>
    );
}

export default Navbar;