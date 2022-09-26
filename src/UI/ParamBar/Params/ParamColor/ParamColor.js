import React, {useEffect, useState} from "react";
import './ParamColor.scss'
import useHttp from "../../../../hooks/http.hook";

export default function ParamColor ({ addClass, setParam, type }) {
    const {request} = useHttp()
    const [allColor, setAllColor] = useState([])

    // Получение всех производителей
    useEffect(() => {
        request('/api/goods/getParam', 'POST', {IDpar: 3, IDtg: type}).then(req => {
            req.forEach(el => {
                setAllColor(prev => prev.indexOf(el.gpVal) === -1 ? [...prev, el.gpVal] : prev)
            })
        })
    }, [])

    // Выбор производителей
    const colorChange = event => {
        setParam(prev => {
            if (prev.color.indexOf(event.target.value) === -1) {
                return {...prev, color: [...prev.color, event.target.value]}
            } else {
                return {...prev, color: prev.color.filter(fil => fil !== event.target.value)}
            }
        })
    }

    return (
        <div className={`ParamColor ${addClass}`}>
            <h4 className="ParamColor__param-name"> Цвет </h4>
            <div className="ParamColor__inputs">
                {allColor.map((el, id) => {
                    return (
                        <div className={`ParamColor__color`} key={id}>
                            <input onChange={colorChange} type="checkbox" className={`ParamColor__color-input`}
                                   id={`color_${id}`} value={el}/>
                            <label className={`ParamColor__color-name`} htmlFor={`color_${id}`}> {el} </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}