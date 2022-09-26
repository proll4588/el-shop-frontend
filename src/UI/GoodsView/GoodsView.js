import React, {useEffect, useState} from "react";

/* Стили */
import './GoodsView.scss'
/**/

/* Пользовательские хуки */
import useHttp from "../../hooks/http.hook";
/**/

/* Компоненты */
import GoodsCard from "../GoodsCard/GoodsCard";
import ParamBar from "../ParamBar/ParamBar";
/**/

/*
* GoodsView - обёртка для отображения товаров
*   Название        тип         описание
*
*   addClass        string      добавочный className
*   type            number      Id типа товара
*   isLock          bool        блокировка добавления в корзину
*/
export default function GoodsView({goods, type, isLock}) {
    const {request} = useHttp()

    // Параметры всех товаров
    const [goodsParam, setGoodsParam] = useState([])
    /*
    * [[{
    *       IDgc - Id товара
    *       IDpar - Id параметра
    *       IDtg - Id типа товара
    *       gcName - имя товара
    *       gpVal - значение параметраа
    *       parName - название параметра
    * }]]
    */

    // Товаря для отображения на странице(отфильтрованные)
    const [GoodsForRender, setGoodsForRender] = useState(null)
    /*
    * [[{
    *       IDgc - Id товара
    *       IDtg - Id типа товара
    *       gcCost - стоимость товара
    *       gcDescription - описание товара
    *       gcName - имя товара
    *       gcPhoto - ссылка на фото
    *       sCount - кол-во на складе
    *       tgName - название типа товара
    * }]]
    */

    // Параметры фильтрации товаров
    const [param, setParam] = useState({cost:{min: 0, max: 0}, makers: [], RAM: [], color:[]})
    /*
    * {
    *   cost: {min, max}
    *   makers: [производители]
    *   RAM: [ram]
    *   color: [colors]
    * }
    */

    // Получение параметров всех товаров
    useEffect(() => {
        let params = []
        goods.forEach(good => {
            request('/api/goods/getParamGood', 'POST', {IDgc: good.IDgc}).then(req => {
                params.push(req)
            })
        })
        setGoodsParam(params)
    }, [goods])

    // Фильтрация товаров
    useEffect(() => {
        setGoodsForRender(goods.filter(good => {
            let is = true

            // На случий если фильтры не заданы
            if (!param.makers.length && (param.cost.min === 0 && param.cost.max === 0) && !param.RAM.length && !param.color.length) return true

            // Фильтрация по производителю
            if (param.makers.length) {
                goodsParam.forEach(el1 => {
                    el1.forEach(el2 => {
                        if (good.IDgc === el2.IDgc && el2.IDpar === 2) {
                            let res = false
                            param.makers.forEach(el3 => {
                                res = res || el3 === el2.gpVal
                            })
                            is = res
                        }
                    })
                })
            }

            // Фильтрация по цене
            if (param.cost.min !== 0 || param.cost.max !== 0) {
                if (param.cost.min === 0 && param.cost.max !== 0) {
                    if (good.gcCost > param.cost.max) {
                        is = false
                    }
                } else if (param.cost.min !== 0 && param.cost.max === 0) {
                    if (good.gcCost < param.cost.min) {
                        is = false
                    }
                } else {
                    if (good.gcCost < param.cost.min || good.gcCost > param.cost.max) {
                        is = false
                    }
                }
            }

            //Фильтрация по объёму оперативной памяти
            if (param.RAM.length) {
                goodsParam.forEach(goodParams => {
                    goodParams.forEach(parameter => {
                        if (good.IDgc === parameter.IDgc && parameter.IDpar === 5) {
                            let isIn = false

                            param.RAM.forEach(el3 => {
                                if (el3 === parameter.gpVal) {
                                    isIn = true
                                }
                            })

                            if (!isIn) {
                                is = false
                            }
                        }
                    })
                })
            }

            //Фильтрация по цвету
            if (param.color.length) {
                goodsParam.forEach(goodParams => {
                    goodParams.forEach(parameter => {
                        if (good.IDgc === parameter.IDgc && parameter.IDpar === 3) {
                            let isIn = false

                            param.color.forEach(el3 => {
                                if (el3 === parameter.gpVal) {
                                    isIn = true
                                }
                            })

                            if (!isIn) {
                                is = false
                            }
                        }
                    })
                })
            }

            return is
        }))
    }, [param, goods])

    return (
        <div className="GoodsView">
            {GoodsForRender ? GoodsForRender.map(good => {
                return <GoodsCard addClass={'GoodsView__GoodsCard'} info={good} key={good.IDgc} isLock={isLock}/>
            }) : ""}
            {goods ? <ParamBar setParam={setParam} type={type}/> : ''}
        </div>
    )
}