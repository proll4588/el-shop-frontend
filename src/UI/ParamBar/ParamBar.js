import React from "react";
import './ParamBar.scss'
import ParamMakers from "./Params/ParamMakers/ParamMakers";
import ParamCost from "./Params/ParamCost/ParamCost";
import ParamRAM from "./Params/ParamRAM/ParamRAM";
import ParamColor from "./Params/ParamColor/ParamColor";

export default function ParamBar({addClass, setParam, type}) {

    return (
        <div className={`ParamBar ${addClass}`}>
            <div className="ParamBar__container">
                <div className="ParamBar__content">

                    {/*Фильтрация по цене*/}
                    <ParamCost setParam={setParam}/>

                    {/*Фильтрация по производителю*/}
                    <ParamMakers setParam={setParam} type={type}/>

                    {/*Фильтрация по объёму оперативной памяти*/}
                    <ParamRAM setParam={setParam} type={type} />

                    {/*Фильтрация по цвету*/}
                    <ParamColor setParam={setParam} type={type} />
                </div>
            </div>
        </div>
    )
}
