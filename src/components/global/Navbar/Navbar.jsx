import React, {useEffect, useState} from 'react';
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";

function Navbar() {
    const [burgerOpened,setBurgerOpened] = useState(window.screen.width > 576)

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
            />
        </>
    );
}

export default Navbar;