import React, {useContext} from "react";
import './HeadBar.scss'
import {AuthContext} from "../../context/AuthContext";

export default function HeadBar({ addClass, toggleSideBar }) {
    const auth = useContext(AuthContext)
    const name = auth.userLogin ? auth.userLogin : "Гость"

    return (
        <div className={`HeadBar ${addClass}`}>
            <div className="HeadBar__menu-toggle" onClick={toggleSideBar}>
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="HeadBar__search">
                <label htmlFor="">
                    <input className={"HeadBar__input"} type="text" placeholder={"Искать товар"}/>
                    <ion-icon name="search-outline"></ion-icon>
                </label>
            </div>
            <div className="HeadBar__user">
                {name}
            </div>
        </div>
    )
}