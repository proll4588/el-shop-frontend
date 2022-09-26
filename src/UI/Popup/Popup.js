import React, {useContext} from "react";
import './Popup.scss'
import {AuthContext} from "../../context/AuthContext";

export default function Popup({addClass, info, close, addToCart, inCart, params, isLock}) {
    const auth = useContext(AuthContext)

    return (
        <div className={`Popup ${addClass}`}>
            <div className="Popup__container">
                <div className="Popup__content">
                    <img src={info.gcPhoto} alt={info.gcName} className="Popup__img"/>
                    <div className="Popup__dis">
                        <h2 className="Popup__name">
                            {info.gcName}
                        </h2>

                        <div className="Popup__trans">
                            <h3 className="Popup__cost">
                                {info.gcCost}₽
                            </h3>

                            {auth.isAuth && info.sCount ? <button className="Popup__addToCart" onClick={addToCart} disabled={isLock || inCart}>
                                <ion-icon name="cart-outline"/>
                            </button> : ""}
                        </div>


                        <div className="Popup__dis-good">
                            <ul className="Popup__params">
                                {params.map((el, id) => {
                                    return (
                                        <li className="Popup__param" key={id}>
                                            {el.parName}: {el.gpVal}
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                        <div className="Popup__num">
                            Кол-во на складе - {info.sCount} шт.
                        </div>
                    </div>
                    <button className="Popup__btn-close" onClick={close}>
                        <ion-icon name="close-circle-outline"/>
                    </button>
                </div>
            </div>
        </div>
    )
}