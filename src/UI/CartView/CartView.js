import React from "react";

/* Стили */
import './CartView.scss'
/**/

/* Компоненты */
import GoodsCartCard from "../GoodsCartCard/GoodsCartCard";
/**/

/*
* CartView - обёртка для карточек товаров корзины
*   Название        тип         описание
*
*   addClass        string      добавочный className
*   goods           [{}]        Массив товароы
*   setGoods        fun         Изменение товаров корзины
*   setCost         fun         Изменение общей цены товаров корзины
*   isLock          bool        Блокировка изменения товара
*/
export default function CartView({addClass, goods, setGoods, setCost, isLock}) {
    return (
        <div className={`CartView ${addClass}`}>
            {goods.map((el, id) => {
                return <GoodsCartCard addClass={`CartView__GoodsCartCard`} key={id} info={el} setGoods={setGoods} setCost={setCost} isLock={isLock}/>
            })}
        </div>
    )
}
