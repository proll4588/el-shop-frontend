import React, {useContext, useEffect, useState} from 'react'

/* Стили */
import './GoodsCard.scss'
/**/

/* Контексты */
import {AuthContext} from "../../context/AuthContext";
/**/

/* Пользовательские хуки */
import useHttp from "../../hooks/http.hook";
/**/

/* Компоненты */
import Popup from "../Popup/Popup";
/**/

/*
* GoodsCard - карточка товара
*   Название        тип         описание
*
*   addClass        string      добавочный className
*   info            object      Данные товара
*   isLock          bool        блокировка добавления в корзину
*/
export default function GoodsCard({addClass, info, isLock}) {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    // Флаг процесса загрузки данных
    const [load, setLoad] = useState(false)

    // Наличие товара в корзине
    const [inCart, setInCart] = useState(false)

    // Режим отображения товара(карточка/всплы.окно)
    const [isFull, setIsFull] = useState(false)

    // Параметры товара
    const [params, setParams] = useState(null)
    /*
    * [{
    *       IDgc - Id товара
    *       IDpar - Id параметра
    *       IDtg - Id типа товара
    *       gcName - имя товара
    *       gpVal - значение параметраа
    *       parName - название параметра
    * }]
    */

    // Добавление товара в корзину
    const postCart = () => {
        setLoad(true)
        request('/api/goods/postCart', 'POST', {
            pID: auth.userId,
            IDgc: info.IDgc,
            num: 1
        }).then(() => setLoad(false))
        setInCart(true)
    }

    // Прелоад данных
    useEffect(() => {
        request('/api/goods/getCart', 'POST', {pID: auth.userId}).then((ans) => {
            // Проверка на наличие в корзине
            ans.forEach((el) => {
                if (el.IDgc === info.IDgc) {
                    setInCart(true)
                }
            })

            // Получение параметров товара
            request('/api/goods/getParamGood', 'POST' ,{IDgc: info.IDgc}).then(req => {
                setParams(req)
            })
        })
    }, [])

    // Показать всплыв.окно
    const showFull = () => {
        setIsFull(true)
    }

    // Убрать всплыв.окно
    const hideFull = () => {
        setIsFull(false)
    }

    return (
        <div className={`GoodsCard ${addClass}`}>
            <img src={info.gcPhoto} alt={"info.gcName"} className="GoodsCard__photo" onClick={showFull}/>
            <div className="GoodsCard__container">
                <div className="GoodsCard__info">
                    <div className="GoodsCard__info-up">
                        <h3 className="GoodsCard__name">{info.gcName}</h3>
                        <h3 className="GoodsCard__cost">{info.gcCost}₽</h3>
                    </div>
                    <p className="GoodsCard__dis">
                        {info.gcDescription}
                        {inCart ? <button className="GoodsCard__btn-add-to-cart" disabled={!auth.isAuth || load || inCart}>
                            <ion-icon name="cart-outline"/>
                        </button> : ""}

                    </p>
                </div>
                {isFull ? <Popup addClass={"GoodsCard__Popup"} info={{...info}} close={hideFull}
                                 addToCart={postCart} inCart={inCart} params={params} isLock={isLock}/> : ""}
            </div>
        </div>
    )
}