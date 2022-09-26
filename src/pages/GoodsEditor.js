import React, {useEffect, useState} from "react";
import useHttp from "../hooks/http.hook";
import './GoodsEditor.scss'

export default function GoodsEditor({addClass}) {
    const {request} = useHttp()
    const [types, setTypes] = useState(null)
    const [paramsName, setParamsName] = useState(null)

    const [goodsParams, setGoodsParams] = useState(null)
    const [goodsCatalogParams, setGoodsCatalogParams] = useState(null)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        request('/api/goods/getType').then(req => {
            setTypes(req)
        })
    }, [])

    useEffect(() => {
        request('/api/goods/getParamName').then(req => {
            setParamsName(req)
        })
    }, [])

    const radioChanger = event => {
        setGoodsCatalogParams(prev => ({...prev, IDtg: event.target.value}))
    }

    const inputChanger = event => {
        setGoodsCatalogParams(prev => ({...prev, [event.target.name]: event.target.value}))
        console.log('goodsCatalogParams: ', goodsCatalogParams)
    }

    const paramsChange = event => {
        setGoodsParams(prev => {
            if (prev) {
                let isIn = false
                prev.forEach(el => {
                    if (el.IDpar === Number(event.target.name)) {
                        isIn = true
                        el.gpVal = event.target.value
                    }
                })
                if (!isIn) {
                    return [...prev, {IDpar: Number(event.target.name), gpVal: event.target.value}]
                }
            } else {
                return [{IDpar: Number(event.target.name), gpVal: event.target.value}]
            }

            return prev
        })

        console.log('params: ', goodsParams)
    }

    const postGood = () => {
        setLoading(true)
        request('/api/goods/postGood', 'POST', {gcParams: goodsCatalogParams, mainParams: goodsParams}).then(req => {
            setLoading(false)
        })
    }

    return (
        <div className={`GoodsEditor ${addClass}`}>
            <div className="GoodsEditor__container">
                <div className="GoodsEditor__content">
                    <h1 className="GoodsEditor__head">
                        Добавление товара в базу данных
                    </h1>
                    <div className="GoodsEditor__inputs">
                        <div className="GoodsEditor__inputs-type">
                            {types ? types.map((type, id) => {
                                return (
                                    <div className={`GoodsEditor__input-container-radio`} key={id}>
                                        <input type={`radio`} id={`type_${type.tgName}`} name={`type`} value={type.IDtg}
                                               className={`GoodsEditor__input-radio`} onChange={radioChanger}/>
                                        <label htmlFor={`type_${type.tgName}`} className={`GoodsEditor__label`}>
                                            {type.tgName}
                                        </label>
                                    </div>
                                )
                            }) : ""}
                        </div>

                        <div className="GoodsEditor__input-container">
                            <h3 className="GoodsEditor__par-name">Имя товара</h3>
                            <input type="text" className="GoodsEditor__input GoodsEditor__input-name" name={`gcName`}
                                   onChange={inputChanger}/>
                        </div>

                        <div className="GoodsEditor__input-container">
                            <h3 className="GoodsEditor__par-name">Описание товара</h3>
                            <input type="text" className="GoodsEditor__input GoodsEditor__input-des"
                                   name={`gcDescription`} onChange={inputChanger}/>
                        </div>

                        <div className="GoodsEditor__input-container">
                            <h3 className="GoodsEditor__par-name">Цена товара</h3>
                            <input type="text" className="GoodsEditor__input GoodsEditor__input-cost" name={`gcCost`}
                                   onChange={inputChanger}/>
                        </div>

                        <div className="GoodsEditor__input-container">
                            <h3 className="GoodsEditor__par-name">Ссылка на фото товара</h3>
                            <input type="text" className="GoodsEditor__input GoodsEditor__input-photo" name={`gcPhoto`}
                                   onChange={inputChanger}/>
                        </div>

                        <div className="GoodsEditor__input-container">
                            <h3 className="GoodsEditor__par-name">Кол-во на складе</h3>
                            <input type="text" className="GoodsEditor__input GoodsEditor__input-col" name={`sCount`}
                                   onChange={inputChanger}/>
                        </div>

                            {paramsName ? paramsName.map((el, id) => {
                                return (
                                    <div className="GoodsEditor__input-container" key={id}>
                                        <h3 className="GoodsEditor__par-name"> {el.parName} </h3>
                                        <input type="text" className="GoodsEditor__input" name={el.IDpar}
                                               onChange={paramsChange}/>
                                    </div>
                                )
                            }) : ""}

                        <button className="GoodsEditor__addToDataBase" onClick={postGood} disabled={loading}>
                            Добавить товар
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}