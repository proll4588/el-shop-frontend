import React, {useContext, useEffect, useState} from "react"

/* Стили */
import './GoodsCartCard.scss'
/**/

/* Контексты */
import {AuthContext} from "../../context/AuthContext"
/**/

/* Пользовательские хуки */
import useHttp from "../../hooks/http.hook"
/**/

/*
* GoodsCartCard - карточка товара корзины
*   Название        тип         описание
*
*   addClass        string      добавочный className
*   info            object      Данные товара
*   setGoods        fun         Изменение списка товаров корзины
*   setCost         fun         Именение общей цены товаров корзины
*   isLock          bool        блокировка изменение товара
*/
export default function GoodsCartCard({addClass, info, setGoods, setCost, isLock}) {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    // Добавочное кол-во товара
    const [add, setAdd] = useState(0)

    // Флаг загрузки данных
    const [load, setLoad] = useState(false)

    // Сумирование цен товаров для формирование общей цены
    useEffect(() => {
        setCost(prev => prev + info.gcCost * (info.cNum + add))
    }, [])

    // Добвление к цене
    const addCost = () => {
        setCost(prev => prev + info.gcCost)
    }

    // Убавление цены
    const subCost = () => {
        setCost(prev => prev - info.gcCost)
    }

    // Добвление кол-во товара
    const addNum = () => {
        if (info.cNum + add + 1 <= info.sCount) {
            setLoad(true)
            setAdd(prev => prev + 1)
            addCost()
            request('/api/goods/setNumCartGood', 'POST', {
                pID: auth.userId,
                IDgc: info.IDgc,
                cNum: info.cNum + add + 1
            }).then(() => setLoad(false))
        }
    }

    // Убавление кол-во товара
    const subNum = () => {
        if (add - 1 + info.cNum > 0) {
            setLoad(true)
            setAdd(add - 1)
            subCost()
            request('/api/goods/setNumCartGood', 'POST', {
                pID: auth.userId,
                IDgc: info.IDgc,
                cNum: info.cNum + add - 1
            }).then(() => setLoad(false))
        }
    }

    // Удаление товара
    const deleteGood = () => {
        setLoad(true)
        setCost(prev => prev - info.gcCost * (info.cNum + add))
        request('/api/goods/removeCartGood', 'POST', {
            pID: auth.userId,
            IDgc: info.IDgc,
        }).then(() => {
            setLoad(false)
            setGoods(prev => {
                return prev.filter(el => {
                    return el.IDgc !== info.IDgc
                })
            })
        })
    }

    return (
        <div className={`GoodsCartCard ${addClass}`}>
            <img src={info.gcPhoto} alt={info.gcName} className="GoodsCartCard__photo"/>
            <div className="GoodsCartCard__name">
                {info.gcName}
            </div>

            <div className="GoodsCartCard__cost">
                <div className="GoodsCartCard__cost-num">
                    {info.gcCost * (info.cNum + add)}₽
                </div>
                <div className="GoodsCartCard__num">
                    <button className="GoodsCartCard__btn GoodsCartCard__btn_add" onClick={addNum} disabled={isLock || load || info.cNum + add + 1 > info.sCount}>
                        +
                    </button>
                    {info.cNum + add}
                    <button className="GoodsCartCard__btn GoodsCartCard__btn_sub" onClick={subNum}
                            disabled={isLock || load || !(add - 1 + info.cNum > 0)}>
                        -
                    </button>
                </div>

                <button className="GoodsCartCard__delete" onClick={deleteGood} disabled={isLock}>
                    <ion-icon name="trash-outline"/>
                </button>
            </div>
        </div>
    )
}