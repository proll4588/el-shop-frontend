import React, {useContext} from 'react'
import './SideBar.scss'
import {useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

export default function SideBar({addClass, isMini}) {
    const auth = useContext(AuthContext)

    const menuItem = [
        {
            id: 0,
            name: "React",
            url: "/123",
            icon: (<ion-icon name="logo-react"/>),
            isActive: false,
            watch: "always"
        },
        {
            id: 1,
            name: "Каталог",
            url: "/catalog",
            icon: (<ion-icon name="laptop-outline"/>),
            isActive: false,
            watch: "always"
        },
        {
            id: 2,
            name: "Что-то",
            url: "#",
            icon: (<ion-icon name="laptop-outline"/>),
            isActive: false,
            watch: "hiden"
        },
        {
            id: 3,
            name: "Корзина",
            url: "/cart",
            icon: (<ion-icon name="cart-outline"/>),
            isActive: false,
            watch: "login"
        },
        {
            id: 4,
            name: "Войти",
            url: "/login",
            icon: (<ion-icon name="log-in-outline"/>),
            isActive: false,
            watch: "logout"
        },
        {
            id: 5,
            name: "Зарегистрироваться",
            url: "/reg",
            icon: (<ion-icon name="person-circle-outline"/>),
            isActive: false,
            watch: "logout"
        }
    ]

    const loc = useLocation().pathname
    menuItem.forEach(el => {
        if (el.url === loc) {
            el.isActive = true;
        }
    })

    return (
        <div className={`SideBar ${isMini ? "SideBar_mini" : ""} ${addClass}`}>
            <ul className={"SideBar__list"}>
                {menuItem.map((el, id) => {
                    if (el.watch === "always" || (auth.isAuth && el.watch === "login") || (!auth.isAuth && el.watch === "logout"))
                        return (
                            <li className={`SideBar__el ${el.isActive ? "SideBar__el_active" : ""}`} key={id}>
                                <a className={"SideBar__a"} href={el.url}>
                                    <span className="SideBar__icon">
                                        {el.icon}
                                    </span>
                                    <span className="SideBar__title">
                                        {el.name}
                                    </span>
                                </a>
                            </li>
                        )
                    else
                        return ("")
                })}

                <li className="SideBar__el" style={{display: auth.isAuth ? "block" : "none"}} onClick={auth.logout}>
                    <button className="SideBar__logout-btn">
                        <ion-icon name="log-out-outline"/>
                    </button>
                </li>
            </ul>
        </div>
    )
}