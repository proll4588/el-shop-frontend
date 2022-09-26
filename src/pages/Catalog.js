import React, {useContext, useEffect, useState} from "react";

/* Контексты */
import {AuthContext} from "../context/AuthContext";
/**/

/* Пользовательские хуки */
import useHttp from "../hooks/http.hook";
/**/

/* Компоненты */
import GoodsView from "../UI/GoodsView/GoodsView";
import TypeView from "../UI/TypeView/TypeView";
/**/

/*
* Catalog - обёртка для каталога товаров
*/
export default function Catalog() {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    // Товары для отображения
    const [goods, setGoods] = useState(null)
    /*
    * [{
    *      IDgc - Id товара
    *      IDtg - Id типа товара
    *      gcCost - Цена
    *      gcDescription - Описание товара
    *      gcName - Имя товара
    *      gcPhoto - Ссылка на картинку
    *      sCount - Кол-во на складе
    *      tgName - Назвние типа товара
    * }]
    */

    // Все типы товаров
    const [types, setTypes] = useState(null)
    /*
    * [{
    *       IDtg - Id типа товара
    *       tgName - Назвние типа товара
    * }]
    */

    // Id выбранного типа товара
    const [typeGoods, setTypeGoods] = useState(null)

    // Статус корзины
    const [isLock, setIsLock] = useState(false)

    // Прелоад данных
    useEffect(() => {
        // Проверка наличий заказа у пользоваеля
        if (auth.userId) {
            request('/api/goods/IsOrder', 'POST', {pID: auth.userId}).then(req => {
                if (req.res) {
                    setIsLock(true)
                }
            })
        }

        // Получение всех типов товаров
        request('/api/goods/getType').then(req => {
            setTypes(req)
        })
    }, [])

    // console.log('typeGoods: ', typeGoods)

    //Получение товаров по заданному типу
    useEffect(() => {
        if (typeGoods) {
            request('/api/goods/getGoodsByType', 'POST', {IDtg: typeGoods}).then(req => {
                setGoods(req)
            })
        }
    }, [typeGoods])

    return (
        <div className="Catalog">
            {typeGoods ? (goods ? <GoodsView goods={goods} type={typeGoods} isLock={isLock}/> : '') :
                types ? <TypeView addClass={"Catalog__TypeView"} types={types} setType={setTypeGoods}/> : ''}
        </div>
    )
}