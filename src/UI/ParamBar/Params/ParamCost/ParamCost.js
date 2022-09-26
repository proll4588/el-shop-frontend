import React, {useEffect, useState} from "react";
import './ParamCost.scss'

export default function ParamCost({addClass, setParam}) {
    const [minCost, setMinCost] = useState(0)
    const [maxCost, setMaxCost] = useState(0)

    const minChange = event => setMinCost(Number(event.target.value))
    const maxChange = event => setMaxCost(Number(event.target.value))

    useEffect(() => {
        setParam(prev => {
            return {...prev, cost: {min: minCost, max: maxCost}}
        })
    }, [minCost, maxCost])

    return (
        <div className={`ParamCost ${addClass}`}>
            <h4 className="ParamCost__cost-name">
                Цена
            </h4>
            <div className="ParamCost__inputs">
                <input type="text" onChange={minChange} className="ParamCost__input ParamCost__input-cost-min"
                       placeholder={"от"}/>
                <input type="text" onChange={maxChange} className="ParamCost__input ParamCost__input-cost-max"
                       placeholder={"до"}/>
            </div>
        </div>
    )
}