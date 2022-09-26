import React, {useEffect, useState} from "react";
import useHttp from "../../../../hooks/http.hook";
import './ParamMakers.scss'

export default function ParamMakers({addClass, setParam, type}) {
    const {request} = useHttp()
    const [allMakers, setAllMakers] = useState([])

    // Получение всех производителей
    useEffect(() => {
        request('/api/goods/getParam', 'POST', {IDpar: 2, IDtg: type}).then(req => {
            req.forEach(el => {
                setAllMakers(prev => prev.indexOf(el.gpVal) === -1 ? [...prev, el.gpVal] : prev)
            })
        })
    }, [])

    // Выбор производителей
    const makersChange = (event) => {
        setParam(prev => {
            if (prev.makers.indexOf(event.target.value) === -1) {
                return {...prev, makers: [...prev.makers, event.target.value]}
            } else {
                return {...prev, makers: prev.makers.filter(fil => fil !== event.target.value)}
            }
        })
    }

    return (
        <div className={`Makers ${addClass}`}>
            <h4 className="Makers__param-name"> Производители </h4>
            <div className="Makers__inputs">
                {allMakers.map((el, id) => {
                    return (
                        <div className={`Makers__maker`} key={id}>
                            <input onChange={makersChange} type="checkbox" className={`Makers__maker-input`}
                                   id={`maker_${id}`} value={el}/>
                            <label className={`Makers__maker-name`} htmlFor={`maker_${id}`}> {el} </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
