import React, {useContext} from "react";
import './CartMenu.scss'
import useHttp from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export default function CartMenu({addClass, cost, setIsLock, isLock}) {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const postOrder = () => {
        const nowDate = new Date()
        request('/api/goods/postOrder', 'POST', {
            pID: auth.userId,
            date: String(nowDate.getFullYear()) + '-' + String(nowDate.getMonth() + 1) + '-' + String(nowDate.getDate()) + " " + String(nowDate.getHours()) + ":" + String(nowDate.getMinutes()) + ":" + String(nowDate.getSeconds())
        }).then(() => setIsLock(true))
    }

    return (
        <div className={`CartMenu ${addClass}`}>
            <div className="CartMenu__container">
                <div className="CartMenu__content">
                    {isLock ? <button className="CartMenu__pushCart" disabled={true} onClick={postOrder}>
                            Заказ оформлен
                        </button> :
                        <button className="CartMenu__pushCart" onClick={postOrder}>
                            Оформить заказ
                        </button>}

                    <div className="CartMenu__full-sum">
                        {cost}₽
                    </div>
                </div>
            </div>

        </div>
    )
}