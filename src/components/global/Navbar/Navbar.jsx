import React, {useState} from 'react';
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";

function Navbar() {
    const [burgerOpened,setBurgerOpened] = useState(false)

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