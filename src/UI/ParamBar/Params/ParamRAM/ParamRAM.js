import React, {useEffect, useState} from "react";
import './ParamRAM.scss'
import useHttp from "../../../../hooks/http.hook";

export default function ParamRAM({ addClass, setParam, type }) {
    const {request} = useHttp()
    const [allRAM, setAllRAM] = useState([])

    // Получение всех производителей
    useEffect(() => {
        request('/api/goods/getParam', 'POST', {IDpar: 5, IDtg: type}).then(req => {
            req.forEach(el => {
                setAllRAM(prev => prev.indexOf(el.gpVal) === -1 ? [...prev, el.gpVal] : prev)
            })
        })
    }, [])

    // Выбор объёма оперативной памяти
    const RAMChange = event => {
        setParam(prev => {
            if (prev.RAM.indexOf(event.target.value) === -1) {
                return {...prev, RAM: [...prev.RAM, event.target.value]}
            } else {
                return {...prev, RAM: prev.RAM.filter(fil => fil !== event.target.value)}
            }
        })
    }

    return(
        <div className={`ParamRAM ${addClass}`}>
            <h4 className="ParamRAM__param-name"> Объём оперативной памяти </h4>
            <div className="ParamRAM__inputs">
                {allRAM.map((el, id) => {
                    return (
                        <div className={`ParamRAM__RAM`} key={id}>
                            <input onChange={RAMChange} type="checkbox" className={`ParamRAM__RAM-input`}
                                   id={`RAM_${id}`} value={el}/>
                            <label className={`ParamRAM__RAM-name`} htmlFor={`RAM_${id}`}> {el} </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}