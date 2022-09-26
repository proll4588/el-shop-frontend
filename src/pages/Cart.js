import React, {useContext, useEffect, useState} from "react";

/* Пользовательские хуки */
import useHttp from "../hooks/http.hook";
/**/

/* Контексты */
import {AuthContext} from "../context/AuthContext";
/**/

/* Компоненты */
import CartView from "../UI/CartView/CartView";
import CartMenu from "../UI/CartMenu/CartMenu";
/**/

/*
* Cart - обёртка для корзины товаров
*/
export default function Cart() {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    // Товары в корзине
    const [goods, setGoods] = useState(null)
    /*
    * [{
    *       IDgc - Id товара
    *       cNum - Кол-во в корзине
    *       gcCost - Стоимость товара
    *       gcDescription - Описание товара
    *       gcName - Имя товара
    *       gcPhoto - Ссылка на картинку товара
    *       pID - Id пользователя
    *       sCount - Кол-во в на складе
    * }]
    * */

    // Общая стоимость товара
    const [cost, setCost] = useState(0)

    // Блокировка изменения товаров в корзине
    const [isLock, setIsLock] = useState(false)

    // Прелоад данных
    useEffect(() => {
        // Проверка наличия заказа
        request('/api/goods/IsOrder', 'POST', {pID: auth.userId}).then(req => {
            if (req.res) {
                setIsLock(true)
            }
        })

        // Получение товаров корзины
        request('/api/goods/getCart', 'POST', {pID: auth.userId}).then(req => {
            setGoods(req)
        })
    }, [])

    return (
        <div className="Cart">
            {goods && goods.length ? <CartView addClass={`Cart__CartView`} goods={goods} setGoods={setGoods} setCost={setCost} isLock={isLock}/> : <h1 className={`Cart__Null`}>Корзина пуста</h1>}
            {goods && goods.length ? <CartMenu goods={goods} cost={cost} setIsLock={setIsLock} isLock={isLock}/> : ''}
        </div>
    )
}